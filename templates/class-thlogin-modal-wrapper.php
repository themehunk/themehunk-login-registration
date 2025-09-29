<?php
if (!defined('ABSPATH')) {
	exit;
}

require_once THLOGIN_PATH . 'templates/class-thlogin-login-form.php';
require_once THLOGIN_PATH . 'templates/class-thlogin-register-form.php';
require_once THLOGIN_PATH . 'templates/class-thlogin-forgot-password-form.php';

class THLogin_Modal_Wrapper {
	protected $settings;
	protected $design;

	public function __construct() {
		$this->settings = get_option('thlogin_settings', []);
		$this->design = $this->settings['design'] ?? [];
	}

	public function render() {

		$all_settings = get_option( 'thlogin_settings', [] );
		$d  = $all_settings['design'] ?? [];

		$integration = $all_settings['integration']?? [];
		$integration_form_type = $integration['wordpress']['form_type'] ?? [];
		$integration_class = $integration_form_type === 'single' ? 'integration_single thlogin-integrationmodal' : 'integration_double thlogin-integrationmodal';

		$modal_bg_style = $this->get_background_style();
		$filter = isset( $d['form']['form_background']['filter'] ) ? intval( $d['form']['form_background']['filter'] ) : 0;
		$style= '';
		
		$style .= rtrim( $modal_bg_style, ';' ) . ';'; // ensure it ends with semicolon
		$style .= "backdrop-filter: blur({$filter}px);";
		$style .= "-webkit-backdrop-filter: blur({$filter}px);";
		?>
		<?php do_action('thlogin_before_modal');  ?>
		<div id="thlogin-popup-modal"
			class="thlogin-popup-modal <?php echo esc_attr($integration_class); ?>"
			role="dialog"
			aria-modal="true"
			aria-hidden="true"
			style="<?php echo esc_attr( $style ); ?>">
			
			<?php do_action('thlogin_before_modal_content'); ?>

			<div class="thlogin-popup-form-container">
				<?php
				do_action('thlogin_before_forms');

				$login_form    = new THLogin_Login_Form();
				$register_form = new THLogin_Register_Form();
				$forgot_form   = new THLogin_Forgot_Password_Form();

				$login_form->render();
				$register_form->render();
				$forgot_form->render();

				do_action('thlogin_after_forms');	
				?>
			</div>

			<?php do_action('thlogin_after_modal_content'); ?>
		</div>
		<?php do_action('thlogin_after_modal');  ?>
		<?php
	}

	protected function get_background_style() {
		$modal = $this->design['modal']['modal_background'] ?? [];
		$opacity = isset($modal['opacity']) ? floatval($modal['opacity']) : 1;
		$style = '';

		if (!empty($modal)) {
			switch ($modal['type']) {
				case 'color':
					$style = "background-color: {$modal['color']};";
					break;
				case 'gradient':
					$style = "background-image: {$modal['gradient']};";
					break;
				case 'image':
					if (!empty($modal['image']['url'])) {
						$img = $modal['image'];
						$style = "background-image: url('{$img['url']}');";
						$style .= " background-position: {$img['position']};";
						$style .= " background-size: {$img['size']};";
						$style .= " background-repeat: {$img['repeat']};";
					}
					break;
			}
		}

		$style .= " opacity: {$opacity};";
		return $style;
	}
}
