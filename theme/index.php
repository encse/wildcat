<!DOCTYPE html>
<html>
<head>
        <meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
        <meta name="author" content="Encsé (encse)" />
        <meta name="keywords" content="zsonglőr, zsonglőrök, zsonglőrködés" />
        <meta name="description" content="Ha zsonglőr vagy, zsonglőrködni szeretnél tanulni vagy csak érdekel a zsonglőrködés, itt a helyed!" />
        <meta name="viewport" content="initial-scale=1.0,width=device-width">

        <title><?php wp_title('&laquo;', true, 'right'); ?> <?php bloginfo('name'); ?></title>

        <?php wp_head(); ?>
</head>
<body>
        <div id="header">
		<?php wildcat_generate_divs(["header-tree", "header-cloud-1", "header-cloud-2", "header-csoka"]) ?>
                <h1><a href="<?php echo get_option('home'); ?>/">Wildcat <span>Zsonglőr Oldalak<span></a><span class="genericon-menu" id="nav-toggle"></span></h1>
        </div>

        <div id="wrapper-inner">
		<?php wp_nav_menu( array( 
			'theme_location' => 'main-menu', 
			'container_id' => 'nav' 
			) ); ?>

                <div id="sidebar-wrap">
                        <div id="logo-placeholder"></div>
                        <div id="sidebar">
                                <h2>Hozzászólások</h2>
                                <?php wildcat_recent_comments(); ?>
                        </div> <!-- sidebar -->
                </div> <!-- sidebar-wrap -->

		<div id="page">
			<?php if (have_posts()) : the_post(); ?>
				<h1><?php the_title(); ?></h1>
				<?php the_content(); ?>
				<?php comments_template(); ?>
			<?php endif; ?>
		</div> <!-- page -->


	        <div id="footer">
        	        <p>
				<span class="genericon-copy"></span>2004-<?php echo date('Y'); ?> Wildcat Zsonglőr Oldalak &nbsp;
				<span class="genericon-github"></span><a href="https://github.com/encse/wildcat">Github</a>
			</p>
        	</div> <!--footer-->

	</div> <!-- wrapper-inner -->

	<?php wp_footer(); ?>
	<script type="text/javascript">
        	document.getElementById("nav-toggle").addEventListener("click", function(){
               		var menu = document.getElementById('nav');
               		menu.classList.toggle('show');

        	});
	</script>
</body>
</html>

