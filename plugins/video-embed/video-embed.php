<?php
/*
Plugin Name: Video Embed
Plugin URI: http://csokavar.hu/plugins/video-embed/
Description: Standards compliant video embedding in your blog posts.
Version: 1.0
Author: Encse
Author URI: http://csokavar.hu
*/

	
function video_func( $atts, $content = null ) {
    extract( shortcode_atts( array(
		'title' => null,
		'src' => null,
      ), $atts ) );
	
	if(!isset($src))
		return '';
		
		$mp4 = "/videos/mp4/$src.mp4";
		$poster = "/videos/poster/$src.jpg";
		
		ob_start();
		print <<< CODE
			<div class="video">
			<video  controls loop poster="{$poster}">
			  <source src="{$mp4}" type="video/mp4">
				Your browser does not support the video tag.
			</video>
			<div class="title">{$title}</div>
			</div>
CODE;
		$output = ob_get_clean();
	return $output;
}
add_shortcode('juggling-video', 'video_func');
?>
