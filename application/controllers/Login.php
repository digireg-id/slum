<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends MY_Controller {
	public function __construct()
    {
        parent::__construct();
        $this->load->model('m_login');
		$this->load->library('session');
    }

	public function index()
	{
		$this->load->view('login');
	}
	
	public function sign_in() {
		$status = false;
		$message = '';
		$username = $this->security->xss_clean($this->input->post('username'));
		$password = $this->security->xss_clean($this->input->post('password'));
		$remember_me = $this->security->xss_clean($this->input->post('remember_me'));
		$captcha = $this->security->xss_clean($this->input->post('captcha'));
		$session_captcha = $this->session->userdata('captcha_code');

		if($captcha === $session_captcha) {
			$key = $this->encrypted_hash($username, hash("sha256", $password));
			$data = $this->m_login->get_login($username);
			if($data->num_rows() > 0){
				$row = $data->row();
				if($this->encrypted_hash($row->username, $row->password) === $key) {
					$arraydata = array(
						'logged_in'  => true,
						'id' => $row->id,
						'tgl_buat' => $row->tgl_buat,
						'username' => $row->username
					);
					
					$this->session->set_userdata($arraydata);
					$status = true;
					$message = 'Access Granted';
				} else {
					$status = false;
					$message = 'Your password incorrect';
				}
			} else {
					$status = false;
					$message = 'Unknown account';
			}
		} else {
			$status = false;
			$message = 'Incorrect captcha';
		}

		$res = array(
			'status' => $status,
			'message' => $message
		);
		
		echo json_encode($res);
	}
}