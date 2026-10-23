<?php

use Hashids\Hashids;

function __is_logged_in($redirect = false)
{
    return;
    $CI           = & get_instance();
    $user_session = $CI->session->userdata('user_session');
    if (isset($user_session['user_logged_in']) && $user_session['user_info'])
    {
        $CI->session->unset_userdata('redirect_url');
        return true;
    }
    else
    {
        if ($redirect)
        {
            $CI->session->set_userdata('redirect_url', current_url());
            __login_page();
        }
    }
    return false;
}

function __login_page()
{
    redirect(base_url(LOGIN_PAGE));
}

function cnd_url($parts = '')
{
    return CDN_URL . $parts;
}

function cdn_url($parts = '')
{
    return CDN_URL . $parts;
}

function api_url($parts = '')
{
    return API_URL . $parts;
}

function app_url($parts = '')
{
    return API_URL . $parts;
}

function ex_cdn_url($parts = '')
{
    return EX_API_URL . $parts;
}

function flash_message($message, $type)
{
    $CI  = & get_instance();
    $msg = $CI->session->flashdata('msg');
    if (is_countable($msg))
    {
        $cnt = @count($msg);
    }
    else
    {
        $cnt = 0;
    }
    $msg[$cnt]            = array();
    $msg[$cnt]['message'] = $message;
    $msg[$cnt]['type']    = $type;
    $CI->session->set_flashdata('msg', $msg);
}

function alert_message($message, $type)
{
    $CI  = & get_instance();
    $msg = $CI->session->userdata('alert_msg');
    if (is_countable($msg))
    {
        $cnt = @count($msg);
    }
    else
    {
        $cnt = 0;
    }
    $msg[$cnt]            = array();
    $msg[$cnt]['message'] = $message;
    $msg[$cnt]['type']    = $type;
    $CI->session->set_userdata('alert_msg', $msg);
}

function set_view_data($input)
{

    if (isset($input['session_vars']) && is_array($input['session_vars']))
    {
        $_SESSION = $input['session_vars'];
    }

    if (isset($input['flash_messages']) && is_array($input['flash_messages']))
    {
        foreach ($input['flash_messages'] as $fm)
        {
            flash_message($fm['message'], $fm['type']);
        }
    }
    if (isset($input['alert_messages']) && is_array($input['alert_messages']))
    {
        foreach ($input['alert_messages'] as $fm)
        {
            alert_message($fm['message'], $fm['type']);
        }
    }
}

function hash_encode($id)
{
    $hashids = new Hashids('', 10);
    return $hashids->encode($id);
}

function hash_decode($encoded_id)
{
    $hashids = new Hashids('', 10);
    $decoded = $hashids->decode($encoded_id);
    if ($decoded && is_array($decoded) && isset($decoded[0]))
    {
        return $decoded[0];
    }
    return false;
}

function str_encrypt($string)
{
    if (!empty($string)) {
        $key    = hash('sha256', ENC_SECRET_KEY, true);
        $iv     = substr(hash('sha256', ENC_SECRET_IV, true), 0, 16);

        $output = openssl_encrypt($string, HASH_ALGO, $key, OPENSSL_RAW_DATA, $iv);
        return base64_encode($output);
    } else {
        return null;
    }
}

function str_decrypt($string)
{
    if (!empty($string)) {
        $key = hash('sha256', ENC_SECRET_KEY, true);
        $iv  = substr(hash('sha256', ENC_SECRET_IV, true), 0, 16);

        return openssl_decrypt(base64_decode($string), HASH_ALGO, $key, OPENSSL_RAW_DATA, $iv);
    } else {
        return null;
    }
}

function slugify($string)
{
    // Convert to lowercase
    $slug = strtolower($string);

    // Remove any non-alphanumeric characters except spaces and hyphens
    $slug = preg_replace('/[^a-z0-9\s-]/', '', $slug);

    // Replace multiple spaces or hyphens with a single hyphen
    $slug = preg_replace('/[\s-]+/', '-', $slug);

    // Trim hyphens from the beginning and end
    $slug = trim($slug, '-');

    return $slug;
}
