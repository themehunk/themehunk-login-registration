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
		$modal_bg_style = $this->get_background_style();
		?>
		<div id="thlogin-popup-modal"
			class="thlogin-popup-modal"
			role="dialog"
			aria-modal="true"
			aria-hidden="true"
			style="display: none; <?php echo esc_attr($modal_bg_style); ?>">

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
