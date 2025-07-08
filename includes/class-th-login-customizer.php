<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class TH_Login_Customizer {

	public function __construct() {
		add_action( 'customize_register', array( $this, 'register_customizer_settings' ) );
		add_action( 'customize_preview_init', array( $this, 'enqueue_customizer_preview_scripts' ) );

		// ✅ Output styles to frontend
		add_action( 'wp_head', array( $this, 'output_customizer_css' ) );
	}

	public function register_customizer_settings( WP_Customize_Manager $wp_customize ) {

		// Include our custom JSON setting and control classes.
		require_once TH_LOGIN_PATH . 'includes/class-th-login-customize-json-setting.php';
		require_once TH_LOGIN_PATH . 'includes/class-th-login-customize-json-control.php';

		// Load default design settings to use as defaults for Customizer controls.
		$default_design_settings = json_decode( get_option( 'th_login_design_settings', '{}' ), true );

		$wp_customize->add_setting(
			'th_login_design_settings', // This is the main option key.
			array(
				'default'           => json_encode( $default_design_settings ), // Default should be JSON string.
				'type'              => 'option', // Stored in wp_options table.
				'capability'        => 'edit_theme_options',
				'transport'         => 'postMessage', // Managed by individual JSON_Setting instances for postMessage.
				'sanitize_callback' => array( $this, 'sanitize_design_settings_json' ), // Custom sanitization for the entire JSON.
				'validate_callback' => array( $this, 'validate_design_settings_json' ), // Custom validation for the entire JSON.
			)
		);
		
		$wp_customize->add_panel(
			'th_login_design_panel',
			array(
				'priority'    => 160, // Position in Customizer.
				'capability'  => 'edit_theme_options',
				'transport'         => 'postMessage',
				'title'       => esc_html__( 'TH Login Design', 'th-login' ),
				'description' => esc_html__( 'Customize the appearance of your TH Login popups and forms.', 'th-login' ),
			)
		);
		
		$wp_customize->add_section(
			'th_login_modal_section',
			array(
				'title'    => esc_html__( 'Modal & Overlay', 'th-login' ),
				'panel'    => 'th_login_design_panel',
				'priority' => 10,
				'transport'         => 'postMessage',
			)
		);

		$wp_customize->add_setting(
			new TH_Login_Customize_JSON_Setting( 
				$wp_customize,
				'th_login_modal_overlay_color_setting', 
				array(
					'type'          => 'option',
					'capability'    => 'edit_theme_options',
					'transport'     => 'postMessage', 
					'json_property' => 'modal.overlay_color',
					'default'       => $default_design_settings['modal']['overlay_color'] ?? 'rgba(0,0,0,0.7)',
					'sanitize_callback' => 'sanitize_hex_color',
				)
			)
		);

			$wp_customize->add_control(
				new TH_Login_Customize_JSON_Select_Control(
					$wp_customize,
					'th_login_modal_overlay_type_control',
					array(
						'label'         => esc_html__( 'Overlay Background', 'th-login' ),
						'section'       => 'th_login_modal_section',
						'settings'      => 'th_login_design_settings', 
						'json_property' => 'overlay_background_type',
						'default'       => 'color',
						'choices'       => array(
							'color'    => __( 'Color', 'th-login' ),
							'gradient' => __( 'Gradient', 'th-login' ),
							'image'    => __( 'Image', 'th-login' ),
						),
					)
				)
			);


		// $wp_customize->add_control(
		// 	new TH_Login_Customize_JSON_Color_Control( // Use our custom color control
		// 		$wp_customize,
		// 		'th_login_modal_overlay_color_control', // Unique ID for the control.
		// 		array(
		// 			'label'   => esc_html__( 'Overlay Color', 'th-login' ),
		// 			'section' => 'th_login_modal_section',
		// 			'settings' => 'th_login_modal_overlay_color_setting', // Link to the new custom setting instance.
		// 			'json_property' => 'modal.overlay_color', // Pass to JS for preview.
		// 			'transport'         => 'postMessage',
		// 		)
		// 	)
		// );

		// // Setting & Control: Form Background Color
		// $wp_customize->add_setting(
		// 	new TH_Login_Customize_JSON_Setting(
		// 		$wp_customize,
		// 		'th_login_modal_form_bg_color_setting',
		// 		array(
		// 			'type'          => 'option',
		// 			'capability'    => 'edit_theme_options',
		// 			'transport'     => 'postMessage',
		// 			'json_property' => 'modal.form_bg_color',
		// 			'default'       => $default_design_settings['modal']['form_bg_color'] ?? '#ffffff',
		// 			'sanitize_callback' => 'sanitize_hex_color',
		// 		)
		// 	)
		// );
		// $wp_customize->add_control(
		// 	new TH_Login_Customize_JSON_Color_Control(
		// 		$wp_customize,
		// 		'th_login_modal_form_bg_color_control',
		// 		array(
		// 			'label'   => esc_html__( 'Form Background Color', 'th-login' ),
		// 			'section' => 'th_login_modal_section',
		// 			'settings' => 'th_login_modal_form_bg_color_setting',
		// 			'json_property' => 'modal.form_bg_color',
		// 			'transport'         => 'postMessage',
		// 		)
		// 	)
		// );
		// // Setting & Control: Form Border Radius (Top Left)
		// $wp_customize->add_setting(
		// 	new TH_Login_Customize_JSON_Setting(
		// 		$wp_customize,
		// 		'th_login_modal_form_border_radius_tl_setting',
		// 		array(
		// 			'type'          => 'option',
		// 			'capability'    => 'edit_theme_options',
		// 			'transport'     => 'postMessage',
		// 			'json_property' => 'modal.form_border_radius.top_left',
		// 			'default'       => $default_design_settings['modal']['form_border_radius']['top_left'] ?? '12px',
		// 			'sanitize_callback' => 'sanitize_text_field',
		// 		)
		// 	)
		// );
		// $wp_customize->add_control(
		// 	new TH_Login_Customize_JSON_Text_Control(
		// 		$wp_customize,
		// 		'th_login_modal_form_border_radius_tl_control',
		// 		array(
		// 			'label'       => esc_html__( 'Form Border Radius (Top Left)', 'th-login' ),
		// 			'section'     => 'th_login_modal_section',
		// 			'settings'    => 'th_login_modal_form_border_radius_tl_setting',
		// 			'json_property' => 'modal.form_border_radius.top_left',
		// 			'transport'         => 'postMessage',
		// 			'input_attrs' => array(
		// 				'placeholder' => 'e.g., 12px or 1em',
		// 			),
		// 		)
		// 	)
		// );
		// /**
		//  * Section: Login Form Specific Design
		//  */
		// $wp_customize->add_section(
		// 	'th_login_login_form_design_section',
		// 	array(
		// 		'title'    => esc_html__( 'Login Form Design', 'th-login' ),
		// 		'panel'    => 'th_login_design_panel',
		// 		'priority' => 20, // After general section.
		// 		'transport'         => 'postMessage',
		// 	)
		// );
		// // Setting & Control: Login Form Background Color
		// $wp_customize->add_setting(
		// 	new TH_Login_Customize_JSON_Setting(
		// 		$wp_customize,
		// 		'th_login_login_form_bg_color_setting',
		// 		array(
		// 			'type'          => 'option',
		// 			'capability'    => 'edit_theme_options',
		// 			'transport'     => 'postMessage',
		// 			'json_property' => 'login_form.bg_color',
		// 			'default'       => $default_design_settings['login_form']['bg_color'] ?? '#ffffff',
		// 			'sanitize_callback' => 'sanitize_hex_color',
		// 		)
		// 	)
		// );
		// $wp_customize->add_control(
		// 	new TH_Login_Customize_JSON_Color_Control(
		// 		$wp_customize,
		// 		'th_login_login_form_bg_color_control',
		// 		array(
		// 			'label'   => esc_html__( 'Login Form Background Color', 'th-login' ),
		// 			'section' => 'th_login_login_form_design_section',
		// 			'settings' => 'th_login_login_form_bg_color_setting',
		// 			'json_property' => 'login_form.bg_color',
		// 			'transport'         => 'postMessage',
		// 		)
		// 	)
		// );
		// // Setting & Control: Login Form Text Color
		// $wp_customize->add_setting(
		// 	new TH_Login_Customize_JSON_Setting(
		// 		$wp_customize,
		// 		'th_login_login_form_text_color_setting',
		// 		array(
		// 			'type'          => 'option',
		// 			'capability'    => 'edit_theme_options',
		// 			'transport'     => 'postMessage',
		// 			'json_property' => 'login_form.text_color',
		// 			'default'       => $default_design_settings['login_form']['text_color'] ?? '#333333',
		// 			'sanitize_callback' => 'sanitize_hex_color',
		// 		)
		// 	)
		// );
		// $wp_customize->add_control(
		// 	new TH_Login_Customize_JSON_Color_Control(
		// 		$wp_customize,
		// 		'th_login_login_form_text_color_control',
		// 		array(
		// 			'label'   => esc_html__( 'Login Form Text Color', 'th-login' ),
		// 			'section' => 'th_login_login_form_design_section',
		// 			'settings' => 'th_login_login_form_text_color_setting',
		// 			'json_property' => 'login_form.text_color',
		// 			'transport'         => 'postMessage',
		// 		)
		// 	)
		// );
		// /**
		//  * Section: Typography
		//  */
		// $wp_customize->add_section(
		// 	'th_login_typography_section',
		// 	array(
		// 		'title'    => esc_html__( 'Typography', 'th-login' ),
		// 		'panel'    => 'th_login_design_panel',
		// 		'priority' => 30, // After login form section.
		// 		'transport'         => 'postMessage',
		// 	)
		// );
		// // Setting & Control: General Text Color
		// $wp_customize->add_setting(
		// 	new TH_Login_Customize_JSON_Setting(
		// 		$wp_customize,
		// 		'th_login_typography_general_text_color_setting',
		// 		array(
		// 			'type'          => 'option',
		// 			'capability'    => 'edit_theme_options',
		// 			'transport'     => 'postMessage',
		// 			'json_property' => 'typography.general_text.color',
		// 			'default'       => $default_design_settings['typography']['general_text']['color'] ?? '#333333',
		// 			'sanitize_callback' => 'sanitize_hex_color',
		// 		)
		// 	)
		// );
		// $wp_customize->add_control(
		// 	new TH_Login_Customize_JSON_Color_Control(
		// 		$wp_customize,
		// 		'th_login_typography_general_text_color_control',
		// 		array(
		// 			'label'   => esc_html__( 'General Text Color', 'th-login' ),
		// 			'section' => 'th_login_typography_section',
		// 			'settings' => 'th_login_typography_general_text_color_setting',
		// 			'json_property' => 'typography.general_text.color',
		// 			'transport'         => 'postMessage',
		// 		)
		// 	)
		// );
		// // NEW CONTROLS FOR TEXT BORDER
		// // Setting & Control: General Text Border Style
		// $wp_customize->add_setting(
		// 	new TH_Login_Customize_JSON_Setting(
		// 		$wp_customize,
		// 		'th_login_typography_general_text_border_style_setting',
		// 		array(
		// 			'type'          => 'option',
		// 			'capability'    => 'edit_theme_options',
		// 			'transport'     => 'postMessage',
		// 			'json_property' => 'typography.general_text.border_style',
		// 			'default'       => $default_design_settings['typography']['general_text']['border_style'] ?? 'none',
		// 			'sanitize_callback' => 'sanitize_text_field',
		// 		)
		// 	)
		// );
		// $wp_customize->add_control(
		// 	new TH_Login_Customize_JSON_Select_Control(
		// 		$wp_customize,
		// 		'th_login_typography_general_text_border_style_control',
		// 		array(
		// 			'label'   => esc_html__( 'General Text Border Style', 'th-login' ),
		// 			'section' => 'th_login_typography_section',
		// 			'settings' => 'th_login_typography_general_text_border_style_setting',
		// 			'json_property' => 'typography.general_text.border_style',
		// 			'transport'         => 'postMessage',
		// 			'choices' => array(
		// 				'none'   => esc_html__( 'None', 'th-login' ),
		// 				'solid'  => esc_html__( 'Solid', 'th-login' ),
		// 				'dashed' => esc_html__( 'Dashed', 'th-login' ),
		// 				'dotted' => esc_html__( 'Dotted', 'th-login' ),
		// 				'double' => esc_html__( 'Double', 'th-login' ),
		// 			),
		// 		)
		// 	)
		// );
		// // Setting & Control: General Text Border Width
		// $wp_customize->add_setting(
		// 	new TH_Login_Customize_JSON_Setting(
		// 		$wp_customize,
		// 		'th_login_typography_general_text_border_width_setting',
		// 		array(
		// 			'type'          => 'option',
		// 			'capability'    => 'edit_theme_options',
		// 			'transport'     => 'postMessage',
		// 			'json_property' => 'typography.general_text.border_width',
		// 			'default'       => $default_design_settings['typography']['general_text']['border_width'] ?? '0px',
		// 			'sanitize_callback' => 'sanitize_text_field',
		// 		)
		// 	)
		// );
		// $wp_customize->add_control(
		// 	new TH_Login_Customize_JSON_Text_Control(
		// 		$wp_customize,
		// 		'th_login_typography_general_text_border_width_control',
		// 		array(
		// 			'label'       => esc_html__( 'General Text Border Width', 'th-login' ),
		// 			'section'     => 'th_login_typography_section',
		// 			'transport'         => 'postMessage',
		// 			'settings'    => 'th_login_typography_general_text_border_width_setting',
		// 			'json_property' => 'typography.general_text.border_width',
		// 			'input_attrs' => array(
		// 				'placeholder' => 'e.g., 1px or 0.1em',
		// 			),
		// 		)
		// 	)
		// );
		// // Setting & Control: General Text Border Color
		// $wp_customize->add_setting(
		// 	new TH_Login_Customize_JSON_Setting(
		// 		$wp_customize,
		// 		'th_login_typography_general_text_border_color_setting',
		// 		array(
		// 			'type'          => 'option',
		// 			'capability'    => 'edit_theme_options',
		// 			'transport'     => 'postMessage',
		// 			'json_property' => 'typography.general_text.border_color',
		// 			'default'       => $default_design_settings['typography']['general_text']['border_color'] ?? '#000000',
		// 			'sanitize_callback' => 'sanitize_hex_color',
		// 		)
		// 	)
		// );
		// $wp_customize->add_control(
		// 	new TH_Login_Customize_JSON_Color_Control(
		// 		$wp_customize,
		// 		'th_login_typography_general_text_border_color_control',
		// 		array(
		// 			'label'   => esc_html__( 'General Text Border Color', 'th-login' ),
		// 			'section' => 'th_login_typography_section',
		// 			'settings' => 'th_login_typography_general_text_border_color_setting',
		// 			'json_property' => 'typography.general_text.border_color',
		// 			'transport'         => 'postMessage',
		// 		)
		// 	)
		// );
		// // END NEW CONTROLS FOR TEXT BORDER
		// /**
		//  * Section: Custom Code
		//  */
		// $wp_customize->add_section(
		// 	'th_login_custom_code_section',
		// 	array(
		// 		'title'    => esc_html__( 'Custom Code', 'th-login' ),
		// 		'panel'    => 'th_login_design_panel',
		// 		'priority' => 100,
		// 		'transport'         => 'postMessage',
		// 	)
		// );
		// // Setting & Control: Custom CSS
		// $wp_customize->add_setting(
		// 	new TH_Login_Customize_JSON_Setting(
		// 		$wp_customize,
		// 		'th_login_custom_css_setting',
		// 		array(
		// 			'type'          => 'option',
		// 			'capability'    => 'edit_theme_options',
		// 			'transport'     => 'postMessage',
		// 			'json_property' => 'custom_css',
		// 			'default'       => $default_design_settings['custom_css'] ?? '',
		// 			'sanitize_callback' => 'wp_kses_post', // Allow basic CSS.
		// 		)
		// 	)
		// );
		// $wp_customize->add_control(
		// 	new TH_Login_Customize_JSON_Text_Control( // Use our custom text control for custom CSS
		// 		$wp_customize,
		// 		'th_login_custom_css_control', // Unique ID for the control.
		// 		array(
		// 			'label'       => esc_html__( 'Custom CSS', 'th-login' ),
		// 			'type'        => 'textarea', // This control needs to render a textarea.
		// 			'section'     => 'th_login_custom_code_section',
		// 			'settings'    => 'th_login_custom_css_setting',
		// 			'json_property' => 'custom_css',
		// 			'transport'         => 'postMessage',
		// 			'description' => esc_html__( 'Add your custom CSS here.', 'th-login' ),
		// 		)
		// 	)
		// );
	}

	public function sanitize_design_settings_json( $value ) {
	$decoded = json_decode( $value, true );
	if ( ! is_array( $decoded ) ) {
		return '{}'; // Return empty JSON if invalid.
	}

	// Get current settings to merge and preserve non-Customizer managed fields.
	$current_design_settings = json_decode( get_option( 'th_login_design_settings', '{}' ), true );
	$sanitized_settings = $current_design_settings; // Start with current to preserve structure.

	// Sanitize modal settings
	if ( isset( $decoded['modal'] ) ) {
		$modal = $decoded['modal'];
		$current_modal = $current_design_settings['modal'] ?? [];

		// overlay_background_type
		if ( isset( $modal['overlay_background_type'] ) ) {
			$allowed_types = [ 'color', 'gradient', 'image' ];
			$type = sanitize_text_field( $modal['overlay_background_type'] );
			$sanitized_settings['modal']['overlay_background_type'] = in_array( $type, $allowed_types, true )
				? $type
				: ( $current_modal['overlay_background_type'] ?? 'color' );
		}

		// overlay_background_color
		if ( isset( $modal['overlay_background_color'] ) ) {
			$sanitized_settings['modal']['overlay_background_color'] = sanitize_text_field( $modal['overlay_background_color'] );
		}

		// overlay_gradient
		if ( isset( $modal['overlay_gradient'] ) && is_array( $modal['overlay_gradient'] ) ) {
			$gradient = $modal['overlay_gradient'];
			$sanitized_settings['modal']['overlay_gradient'] = array(
				'colors' => array_map( 'sanitize_hex_color', $gradient['colors'] ?? [] ),
				'direction' => sanitize_text_field( $gradient['direction'] ?? 'to bottom right' ),
			);
		}

		// overlay_image_url
		if ( isset( $modal['overlay_image_url'] ) ) {
			$sanitized_settings['modal']['overlay_image_url'] = esc_url_raw( $modal['overlay_image_url'] );
		}
	}

	// Sanitize custom_css
	if ( isset( $decoded['custom_css'] ) ) {
		$sanitized_settings['custom_css'] = wp_kses_post( $decoded['custom_css'] ?? $current_design_settings['custom_css'] ?? '' );
	}

	return json_encode( $sanitized_settings );
}


	public function validate_design_settings_json( $validity, $value ) {
		// Ensure the value is valid JSON.
		json_decode( $value );
		if ( json_last_error() !== JSON_ERROR_NONE ) {
			$validity->add( 'invalid_json', esc_html__( 'Design settings must be valid JSON.', 'th-login' ) );
		}
		return $validity;
	}

	public function output_customizer_css() {
		$design_settings = json_decode( get_option( 'th_login_design_settings', '{}' ), true );

		$overlay_color = $design_settings['modal']['overlay_color'] ?? 'rgba(0,0,0,0.7)';
		$form_bg_color = $design_settings['modal']['form_bg_color'] ?? '#ffffff';
		$form_border_radius_tl = $design_settings['modal']['form_border_radius']['top_left'] ?? '12px';
		$close_button_color = $design_settings['modal']['close_button']['icon_color'] ?? '#333';

		// Login Form specific styles
		$login_form_bg_color = $design_settings['login_form']['bg_color'] ?? '';
		$login_form_text_color = $design_settings['login_form']['text_color'] ?? '';

		// Typography
		$general_text_color = $design_settings['typography']['general_text']['color'] ?? '#333333';
		$text_border_style = $design_settings['typography']['general_text']['border_style'] ?? 'none';
		$text_border_width = $design_settings['typography']['general_text']['border_width'] ?? '0px';
		$text_border_color = $design_settings['typography']['general_text']['border_color'] ?? '#000000';

		$custom_css = $design_settings['custom_css'] ?? '';


		// Only output if plugin is enabled
		$general_settings = json_decode( get_option( 'th_login_general_settings', '{}' ), true );
		if ( ( $general_settings['plugin_status'] ?? 'enabled' ) === 'disabled' ) {
			return;
		}

		?>
			<style type="text/css" id="th-login-customizer-css">
				/* General Modal & Form Styles */
				.th-login-popup-overlay {
					background-color: <?php echo esc_attr( $overlay_color ); ?>;
				}
				.th-login-popup-form-container {
					background-color: <?php echo esc_attr( $form_bg_color ); ?>;
					border-top-left-radius: <?php echo esc_attr( $form_border_radius_tl ); ?>;
				}
				.th-login-popup-close-button {
					color: <?php echo esc_attr( $close_button_color ); ?>;
				}

				/* Login Form Specific Styles */
				<?php if ( ! empty( $login_form_bg_color ) ) : ?>
				.th-login-form[data-form-type="login"] {
					background-color: <?php echo esc_attr( $login_form_bg_color ); ?>;
				}
				<?php endif; ?>
				<?php if ( ! empty( $login_form_text_color ) ) : ?>
				.th-login-form[data-form-type="login"] {
					color: <?php echo esc_attr( $login_form_text_color ); ?>;
				}
				.th-login-form[data-form-type="login"] .th-login-form-field label,
				.th-login-form[data-form-type="login"] .th-login-form-field input[type="text"],
				.th-login-form[data-form-type="login"] .th-login-form-field input[type="email"],
				.th-login-form[data-form-type="login"] .th-login-form-field input[type="password"] {
					color: <?php echo esc_attr( $login_form_text_color ); ?>;
				}
				<?php endif; ?>

				/* Typography Styles */
				.th-login-popup-form-container,
				.th-login-popup-form-container p,
				.th-login-popup-form-container span {
					color: <?php echo esc_attr( $general_text_color ); ?>;
				}

				/* NEW: General Text Border Styles */
				<?php if ( 'none' !== $text_border_style && ! empty( $text_border_width ) && ! empty( $text_border_color ) ) : ?>
				.th-login-popup-form-container p,
				.th-login-popup-form-container span { /* Apply to common text elements */
					border: <?php echo esc_attr( $text_border_width ); ?> <?php echo esc_attr( $text_border_style ); ?> <?php echo esc_attr( $text_border_color ); ?>;
					padding: 5px; /* Add padding to make border visible */
					display: inline-block; /* Ensure it takes up space for border */
				}
				<?php else : ?>
				.th-login-popup-form-container p,
				.th-login-popup-form-container span {
					border: none;
					padding: 0;
				}
				<?php endif; ?>

				/* Custom CSS from settings */
				<?php echo wp_kses_post( $custom_css ); ?>

			</style>
		<?php
	}

	public function enqueue_customizer_preview_scripts() {
		$asset_file = TH_LOGIN_PATH . 'app/build/frontend.asset.php';
		$asset_config = file_exists( $asset_file ) ? require_once $asset_file : array( 'dependencies' => array(), 'version' => TH_LOGIN_VERSION );

		wp_enqueue_script(
			'th-login-customizer-preview',
			TH_LOGIN_URL . 'app/build/customizer-preview.js', // This JS file will listen for changes.
			array_merge( $asset_config['dependencies'], array( 'customize-preview' ) ), // Depend on customize-preview.
			$asset_config['version'],
			true
		);

		// Localize necessary data for the customizer preview script.
		// We don't need to localize 'settings' here, as the Customizer JS will get it directly.
	}
}


if ( ! function_exists( 'sanitize_hex_color_no_hash' ) ) {
	function sanitize_hex_color_no_hash( $color ) {
		if ( empty( $color ) || is_array( $color ) ) {
			return '';
		}

		if ( false === strpos( $color, 'rgba' ) ) {
			// Sanitize hex color.
			$color = ltrim( $color, '#' );
			if ( preg_match( '/^([0-9a-f]{3}){1,2}$/i', $color ) ) {
				return '#' . $color;
			}
		} elseif ( false !== strpos( $color, 'rgba' ) ) {
			// Sanitize rgba color.
			$color = trim( $color );
			$rgba = array();
			preg_match( '/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9\.]+)\s*\)/', $color, $rgba );
			if ( count( $rgba ) === 5 ) {
				foreach ( array( 1, 2, 3 ) as $i ) {
					$rgba[ $i ] = min( 255, absint( $rgba[ $i ] ) );
				}
				$rgba[4] = min( 1, (float) $rgba[4] );
				return 'rgba(' . implode( ',', array_slice( $rgba, 1 ) ) . ')';
			}
		}
		return ''; // Return empty string for invalid colors.
	}
}
