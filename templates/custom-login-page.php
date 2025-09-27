<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <?php wp_head(); ?>
</head>
<body <?php body_class( 'thlogin-page' ); ?>>

    <?php do_action( 'thlogin_before_modal' ); ?>

    

    <?php do_action( 'thlogin_after_modal' ); ?>

    <?php wp_footer(); ?>
</body>
</html>
