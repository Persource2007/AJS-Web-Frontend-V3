<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Contract Time Slots Controller
 *
 * Handles GET and POST for daily appointment slot limits (AM/PM) per contract.
 * Table: contract_time_slots
 */
class TimeSlots extends CI_Controller
{
    private $valid_days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    /**
     * GET  /contract/{contract_id}/time_slots
     * POST /contract/{contract_id}/time_slots
     *
     * Dispatcher — routes to get or post handler based on HTTP method.
     */
    public function time_slots($contract_id)
    {
        $contract_id = is_numeric($contract_id) ? (int) $contract_id : (int) hash_decode($contract_id);

        if ($contract_id <= 0) {
            return $this->_json(['status' => false, 'message' => 'Invalid contract ID'], 400);
        }

        if ($this->input->server('REQUEST_METHOD') === 'POST') {
            $this->_post($contract_id);
        } else {
            $this->_get($contract_id);
        }
    }

    // -----------------------------------------------------------------------
    // Private helpers
    // -----------------------------------------------------------------------

    /**
     * GET handler — return all 7 days, defaulting missing rows to 0/0.
     */
    private function _get($contract_id)
    {
        $rows = $this->db
            ->where('contract_id', $contract_id)
            ->where('status', 1)
            ->get('contract_time_slots')
            ->result_array();

        // Index saved rows by day
        $saved = [];
        foreach ($rows as $row) {
            $saved[$row['day_of_week']] = $row;
        }

        $data = [];
        foreach ($this->valid_days as $day) {
            if (isset($saved[$day])) {
                $data[] = [
                    'id'          => (int) $saved[$day]['id'],
                    'contract_id' => $contract_id,
                    'day_of_week' => $day,
                    'am_slots'    => (int) $saved[$day]['am_slots'],
                    'pm_slots'    => (int) $saved[$day]['pm_slots'],
                ];
            } else {
                $data[] = [
                    'id'          => null,
                    'contract_id' => $contract_id,
                    'day_of_week' => $day,
                    'am_slots'    => 0,
                    'pm_slots'    => 0,
                ];
            }
        }

        $this->_json([
            'status'  => true,
            'message' => 'Time slots fetched successfully',
            'data'    => $data,
        ]);
    }

    /**
     * POST handler — upsert all 7 days.
     */
    private function _post($contract_id)
    {
        $raw = $this->input->raw_input_stream;
        $input = is_string($raw) ? json_decode($raw, true) : null;

        if (empty($input['slots']) || !is_array($input['slots'])) {
            $err_detail = 'Missing or invalid slots array';
            if (empty($raw) || trim($raw) === '') {
                $err_detail = 'Request body is empty. Ensure Content-Type: application/json and body is sent.';
            } elseif ($input === null && json_last_error() !== JSON_ERROR_NONE) {
                $err_detail = 'Invalid JSON: ' . json_last_error_msg();
            }
            return $this->_json(['status' => false, 'message' => 'Validation failed', 'errors' => [$err_detail], 'type' => 'API_ERROR_FORM_VALIDATION'], 400);
        }

        $errors = [];
        $to_upsert = [];

        foreach ($input['slots'] as $slot) {
            $day      = isset($slot['day_of_week']) ? strtolower(trim($slot['day_of_week'])) : '';
            $am_slots = isset($slot['am_slots'])    ? (int) $slot['am_slots']    : -1;
            $pm_slots = isset($slot['pm_slots'])    ? (int) $slot['pm_slots']    : -1;

            if (!in_array($day, $this->valid_days)) {
                $errors[] = 'Invalid or missing day_of_week: ' . htmlspecialchars($slot['day_of_week'] ?? '');
                continue;
            }

            if ($am_slots < 0 || $pm_slots < 0) {
                $errors[] = 'am_slots and pm_slots must be >= 0 for day: ' . $day;
                continue;
            }

            $to_upsert[$day] = [
                'am_slots' => $am_slots,
                'pm_slots' => $pm_slots,
            ];
        }

        if (!empty($errors)) {
            return $this->_json(['status' => false, 'message' => 'Validation failed', 'errors' => $errors, 'type' => 'API_ERROR_FORM_VALIDATION'], 400);
        }

        $now = date('Y-m-d H:i:s');

        foreach ($to_upsert as $day => $values) {
            $existing = $this->db
                ->where('contract_id', $contract_id)
                ->where('day_of_week', $day)
                ->get('contract_time_slots')
                ->row_array();

            if ($existing) {
                $ok = $this->db->where('id', $existing['id'])->update('contract_time_slots', [
                    'am_slots'     => $values['am_slots'],
                    'pm_slots'     => $values['pm_slots'],
                    'updated_date' => $now,
                ]);
            } else {
                $ok = $this->db->insert('contract_time_slots', [
                    'contract_id' => $contract_id,
                    'day_of_week' => $day,
                    'am_slots'    => $values['am_slots'],
                    'pm_slots'    => $values['pm_slots'],
                    'status'      => 1,
                    'add_date'    => $now,
                ]);
            }

            if ( ! $ok) {
                $err = $this->db->error();
                $err_msg = ! empty($err['message']) ? $err['message'] : 'Unknown database error';
                return $this->_json([
                    'status'  => false,
                    'message' => 'Failed to save time slots',
                    'error'   => $err_msg,
                    'type'    => 'API_ERROR_DB',
                ], 500);
            }
        }

        $this->_json([
            'status'  => true,
            'message' => 'Time slots saved successfully',
        ]);
    }

    /**
     * Output JSON response.
     *
     * @param array $data Response payload
     * @param int   $code HTTP status code (default 200)
     */
    private function _json($data, $code = 200)
    {
        $this->output
            ->set_status_header($code)
            ->set_content_type('application/json')
            ->set_output(json_encode($data));
    }
}
