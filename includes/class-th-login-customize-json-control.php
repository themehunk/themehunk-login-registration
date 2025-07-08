<?php

if ( ! class_exists( 'TH_Login_Customize_JSON_Color_Control' ) && class_exists( 'WP_Customize_Color_Control' ) ) {
	class TH_Login_Customize_JSON_Color_Control extends WP_Customize_Color_Control {

		public $json_property = ''; // Path to the property within the JSON (e.g., 'modal.overlay_color').

		/**
		 * Constructor.
		 *
		 * @param WP_Customize_Manager $manager Customizer instance.
		 * @param string               $id      Control ID.
		 * @param array                $args    Arguments.
		 */
		public function __construct( $manager, $id, $args = array() ) {
			parent::__construct( $manager, $id, $args );
			if ( isset( $args['json_property'] ) ) {
				$this->json_property = $args['json_property'];
			}
		}

		/**
		 * Override to_json to pass the json_property to the JS.
		 * This is crucial for the customizer-preview.js to know which part of the JSON to update.
		 */
		public function to_json() {
			parent::to_json();
			$this->json['json_property'] = $this->json_property;
			// The value() method is inherited and will correctly get the value from our custom setting.
		}
	}
}

if (!class_exists('TH_Login_Customize_JSON_Select_Control') && class_exists('WP_Customize_Control')) {
    class TH_Login_Customize_JSON_Select_Control extends WP_Customize_Control {
        public $type = 'json_select';
        public $json_property = '';
        public $choices = array();
        public $default = '';

        public function __construct($manager, $id, $args = array()) {
            parent::__construct($manager, $id, $args);
            if (isset($args['json_property'])) {
                $this->json_property = $args['json_property'];
            }
            if (isset($args['choices'])) {
                $this->choices = $args['choices'];
            }
            if (isset($args['default'])) {
                $this->default = $args['default'];
            }
        }

        protected function render_content() {

			
            $input_id = '_customize-input-' . $this->id;
            $current_value = $this->get_current_value();
            ?>
            <label>
                <?php if (!empty($this->label)) : ?>
                    <span class="customize-control-title"><?php echo esc_html($this->label); ?></span>
                <?php endif; ?>
                <?php if (!empty($this->description)) : ?>
                    <span class="description customize-control-description"><?php echo esc_html($this->description); ?></span>
                <?php endif; ?>
                <select id="<?php echo esc_attr($input_id); ?>" <?php $this->link(); ?>>
                    <?php foreach ($this->choices as $value => $label) : ?>
                        <option value="<?php echo esc_attr($value); ?>" <?php selected($current_value, $value); ?>>
                            <?php echo esc_html($label); ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </label>
            <?php
        }

        protected function get_current_value() {
            $value = $this->value();

            // Handle JSON string
            if (is_string($value)) {
                try {
                    $json = json_decode($value, true);
                    if (json_last_error() === JSON_ERROR_NONE) {
                        $keys = explode('.', $this->json_property);
                        $current = $json;
                        foreach ($keys as $key) {
                            if (isset($current[$key])) {
                                $current = $current[$key];
                            } else {
                                return $this->default;
                            }
                        }
                        return $current;
                    }
                } catch (Exception $e) {
                    return $this->default;
                }
            }
            
            // Handle direct value (shouldn't happen but as fallback)
            return $value ?: $this->default;
        }

        public function to_json() {
            parent::to_json();
            $this->json['json_property'] = $this->json_property;
            $this->json['value'] = $this->get_current_value();
        }
    }
}

if ( ! class_exists( 'TH_Login_Customize_JSON_Text_Control' ) && class_exists( 'WP_Customize_Control' ) ) {
	class TH_Login_Customize_JSON_Text_Control extends WP_Customize_Control {

		public $type = 'json_text';
		public $json_property = '';

		/**
		 * Constructor.
		 *
		 * @param WP_Customize_Manager $manager Customizer instance.
		 * @param string               $id      Control ID.
		 * @param array                $args    Arguments.
		 */
		public function __construct( $manager, $id, $args = array() ) {
			parent::__construct( $manager, $id, $args );
			if ( isset( $args['json_property'] ) ) {
				$this->json_property = $args['json_property'];
			}
		}

		/**
		 * Render the control's content.
		 */
		protected function render_content() {
			$input_id = '_customize-input-' . $this->id;
			?>
			<label>
				<?php if ( ! empty( $this->label ) ) : ?>
					<span class="customize-control-title"><?php echo esc_html( $this->label ); ?></span>
				<?php endif; ?>
				<?php if ( ! empty( $this->description ) ) : ?>
					<span class="description customize-control-description"><?php echo esc_html( $this->description ); ?></span>
				<?php endif; ?>
				<input
					id="<?php echo esc_attr( $input_id ); ?>"
					type="text"
					value="<?php echo esc_attr( $this->value() ); ?>"
					<?php $this->link(); ?>
					<?php if ( isset( $this->input_attrs ) && is_array( $this->input_attrs ) ) : ?>
						<?php foreach ( $this->input_attrs as $attr => $value ) : ?>
							<?php echo esc_attr( $attr ); ?>="<?php echo esc_attr( $value ); ?>"
						<?php endforeach; ?>
					<?php endif; ?>
				/>
			</label>
			<?php
		}

        

		/**
		 * Override to_json to pass the json_property to the JS.
		 */
		public function to_json() {
			parent::to_json();
			$this->json['json_property'] = $this->json_property;
		}
	}
}

if ( ! class_exists( 'TH_Login_Customize_JSON_Control_Image' ) && class_exists( 'WP_Customize_Image_Control' ) ) {
	class TH_Login_Customize_JSON_Control_Image extends WP_Customize_Image_Control {

		public $json_property = '';

		public function __construct( $manager, $id, $args = array() ) {
			parent::__construct( $manager, $id, $args );
			if ( isset( $args['json_property'] ) ) {
				$this->json_property = $args['json_property'];
			}
		}

		public function to_json() {
			parent::to_json();
			$this->json['json_property'] = $this->json_property;
		}
	}
}
