<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// Note: Backend uses RestController and AuthTrait - this is a placeholder
// The actual backend implementation should be at this location
class NotificationSettings extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Test method to verify controller is accessible
     */
    public function index()
    {
        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode([
                'status' => true,
                'message' => 'NotificationSettings controller is accessible',
                'data' => []
            ]));
    }

    /**
     * GET /contract/NotificationSettings/notification_settings_get/{contract_id}
     * Get notification settings for a contract
     */
    public function notification_settings_get($contract_id)
    {
        // Decode contract_id if it's encoded (supports both encoded and numeric IDs)
        $contract_id = (is_numeric($contract_id)) ? $contract_id : hash_decode($contract_id);
        
        // Backend implementation should be here
        // This is a placeholder - backend team has the full implementation
        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode([
                'status' => true,
                'message' => 'Notification settings fetched successfully',
                'data' => []
            ]));
    }

    /**
     * POST /contract/NotificationSettings/notification_settings_post/{contract_id}
     * Save notification settings for a contract
     */
    public function notification_settings_post($contract_id)
    {
        // Decode contract_id if it's encoded (supports both encoded and numeric IDs)
        $contract_id = (is_numeric($contract_id)) ? $contract_id : hash_decode($contract_id);
        
        // Backend implementation should be here
        // This is a placeholder - backend team has the full implementation
        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode([
                'status' => true,
                'message' => 'Notification settings updated successfully',
                'updated' => 0,
                'created' => 0
            ]));
    }

    /**
     * GET /contract/NotificationSettings/available_events_get
     * Get list of available notification events
     */
    public function available_events_get()
    {
        // Backend implementation should be here
        // This is a placeholder - backend team has the full implementation
        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode([
                'status' => true,
                'message' => 'Available events fetched successfully',
                'data' => ['ON_ROUTE']
            ]));
    }
}

