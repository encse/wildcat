<?php
function wildcat_generate_divs($ids)
{
	foreach($ids as $id)
		echo "<div id=\"$id\"></div>";
	echo "\n";
}

function wildcat_recent_comments(){
        $comments = get_comments(
         	array(
               		'number' => 5,
               	 	'date_query' => array(
                        	array(
                                	'column' => 'comment_date',
                                  	'after' => '5 year ago',
                          	)
                 	)
         	)
        );

	echo '<ul>';
        foreach($comments as $comment):
                $link = get_comment_link($comment->comment_ID);
                $author = get_comment_author($comment->comment_ID);
                $excerpt = get_comment_excerpt($comment->comment_ID);
                echo "<li><a href=\"$link\">$author</a>: $excerpt</li>";
        endforeach;
	echo "</ul>\n";
}


function wildcat_scripts_styles() {
	wp_enqueue_style('theme-main', get_stylesheet_directory_uri().'/style.less',array(), '1.11' );

	wp_deregister_style( 'mediaelement');
	wp_deregister_script( 'mediaelement' );
	wp_deregister_script( 'wp-mediaelement' );
}
add_action( 'wp_enqueue_scripts', 'wildcat_scripts_styles' );

function wildcat_show404( $template ) {
    global $wp_query;
    $wp_query = null;
    $wp_query = new WP_Query();
    $wp_query->query( 'pagename=error');
    $wp_query->the_post();
    $template404 = get_page_template();
    rewind_posts();
    return $template404;
}
add_filter( '404_template', 'wildcat_show404' );

function wildcat_init() {
  register_nav_menu('main-menu','Főmenü');
}
add_action( 'init', 'wildcat_init' );

function add_custom_class($classes=array(), $menu_item=false) {
    if ( !is_page() && 'Trükkök' == $menu_item->title &&
            !in_array( 'current-menu-item', $classes ) ) {
        $classes[] = 'current-menu-item';
    }
    return $classes;
}
add_filter('nav_menu_css_class', 'add_custom_class', 100, 2);

remove_action('wp_head', 'print_emoji_detection_script', 7 );
remove_action('wp_print_styles', 'print_emoji_styles' );
remove_action('wp_head', 'rel_canonical');
remove_action('wp_head', 'rsd_link'); // remove really simple discovery link
remove_action('wp_head', 'wp_generator'); // remove wordpress version
remove_action('wp_head', 'feed_links', 2); // remove rss feed links (make sure you add them in yourself if youre using feedblitz or an rss service)
remove_action('wp_head', 'feed_links_extra', 3); // removes all extra rss feed links
remove_action('wp_head', 'index_rel_link'); // remove link to index page
remove_action('wp_head', 'wlwmanifest_link'); // remove wlwmanifest.xml (needed to support windows live writer)
remove_action('wp_head', 'start_post_rel_link', 10, 0); // remove random post link
remove_action('wp_head', 'parent_post_rel_link', 10, 0); // remove parent post link
remove_action('wp_head', 'adjacent_posts_rel_link', 10, 0); // remove the next and previous post links
remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0 );
remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0 );
