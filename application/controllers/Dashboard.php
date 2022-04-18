<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends MY_Controller {
	public function __construct()
    {
        parent::__construct();
        $this->load->model('m_dashboard');
    }
	
	public function index()
	{
        $data_header = array(
			'menu_active' => 'dashboard',
            'title' => 'Dashboard',
			'lib' => '<link href="assets/plugins/custom/leaflet/leaflet.bundle.css?v=7.0.6" rel="stylesheet" type="text/css"/>'
        ); 

        $data_footer = array(
			'menu_active' => 'dashboard',
            'libscript' => '<script src="assets/select2/dist/js/select2.full.min.js"></script>
            <script src="assets/jvectormap/jquery-jvectormap-2.0.3.min.js"></script>
			<script src="assets/jvectormap/maps/indonesia-adm1.js"></script>
			<script type="text/javascript" src="assets/fusioncharts/fusioncharts.js"></script>
			<script type="text/javascript" src="assets/fusioncharts/themes/fusioncharts.theme.carbon.js"></script>
			<script type="text/javascript" src="assets/fusioncharts/themes/fusioncharts.theme.fint.js"></script>
			<script type="text/javascript" src="assets/fusioncharts/themes/fusioncharts.theme.ocean.js"></script>
			<script type="text/javascript" src="assets/fusioncharts/themes/fusioncharts.theme.zune.js"></script>
			<script src="assets/plugins/custom/leaflet/leaflet.bundle.js?v=7.0.6"></script>
			<script type="text/javascript" src="assets/js/dashboard.js"></script>'
        );

		$this->load->view('commons/header', $data_header);
		$this->load->view('dashboard');
		$this->load->view('commons/footer', $data_footer);
	}

	public function get_data_support()
	{
		$ret = array();
        $data = $this->m_dashboard->get_list_data();

		if($data){
            foreach($data as $item)
            {
				$arr = array(
					'label' => $item->label,
					'layer' => $item->objek,
					'jenis' => $item->jenis
				);

                array_push($ret, $arr);
            }
        }else{
			$ret = array(
				'label' => '',
				'layer' => '',
				'jenis' => ''
			);
		}
        
        echo json_encode($ret);
	}

	public function save()
	{
		$str = '';
		$q1 = $this->input->post('q1');
		$q2 = $this->input->post('q2');
		$q3 = $this->input->post('q3');
		$q4 = $this->input->post('q4');
		$q5 = $this->input->post('q5');

		$a1 = $this->input->post('peran');
		$a2 = $this->input->post('pengalaman');
		$a3 = $this->input->post('live');
		$a4 = $this->input->post('live_year');
		$a5 = $this->input->post('device');
		$submission = $this->input->post('submission');

		$set_data = array(
			$q1 => $a1, 
			$q2 => $a2, 
			$q3 => $a3, 
			$q4 => $a4,
			$q5 => $a5,
			'submission' => $submission
		);

		$data = $this->m_dashboard->save_data($set_data);

		if($data) {
			$status = true;
			$message = 'Data successfully submited';
		} else {
			$status = false;
			$message = 'Data failure submited';
		}

		$ret = array(
			'status' => $status,
			'message' => $message
		);

		echo json_encode($ret);
	}

	public function get_datax()
	{
		// echo '{
		// 	"submission": [{
		// 		"id": 1,
		// 		"data": [{
		// 			"field": "q1",
		// 			"type": "multiple",
		// 			"value": [
		// 				"1 - Kepadatan bangunan tinggi",
		// 				"2 - Struktur bangunan tidak teratur",
		// 				"3 - Warna atap bangunan"
		// 			]
		// 		}, {
		// 			"field": "q2",
		// 			"type": "single",
		// 			"value": "Tidak mengenal"
		// 		}]
		// 	}]
		// }';
	}
}