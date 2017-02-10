<div id="comments">
	<?php
		$comments = get_comments(
			array(
				'post_id' => $post->ID,
				'date_query' => array(
					array(
					'column' => 'comment_date',
					'after' => '5 year ago',
					)
				)
			)
		);
	?>

	<?php if ( sizeof($comments) > 0 ) : ?>
		<h2 class="comments-title"><span class="genericon-comment"></span> Hozzászólások</h2>
		<?php foreach($comments as $comment) : ?>

 			<div class="comment-box">
                		<div class="comment" id="comment-<?php comment_ID(); ?>">
                			<div class="comment-head">
                       				<div class="comment-gravatar"><?php echo get_avatar($comment, 64); ?></div>
                        			<div class="comment-author"><?php echo get_comment_author_link() ?></div>
                        			<div class="comment-date"><?php echo get_comment_date() ?></div>
                        			<div><?php edit_comment_link('Szerkesztés','  ','') ?></div>
                			</div>
        	                	<div class="comment-content">
	                        		<?php if ($comment->comment_approved == '0') : ?>
        	                       			<em>Hozzászólásod moderálásra vár.</em><br />
	        	               		<?php endif; ?>
                        	        	<?php comment_text() ?>
                        		</div>
                		</div>
			</div>

		<?php endforeach; ?> 
	<?php else if ('open' == $post->comment_status) : ?>
		<h2 class="comments-title"><span class="genericon-comment"></span>Szólj hozzá</h2>
	<?php endif; ?>

</div> <!--end comments-->

<?php if ('open' == $post->comment_status) : ?>

	<div id="respond">

		<form action="<?php echo get_option('siteurl'); ?>/wp-comments-post.php" method="post" id="commentform">
			<?php comment_id_fields(); ?>
			<?php do_action('comment_form', $post->ID); ?>
			<ol>
				<?php if ( $user_ID ) : ?>
					<li>
						<?php printf('Bejelentkezve mint <a href="%1$s">%2$s</a>.', get_option('siteurl') . '/wp-admin/profile.php', $user_identity); ?> <a href="<?php echo wp_logout_url(get_permalink()); ?>">Kijelentkezés</a>
					</li>
				<?php else : ?>
					<li>
						<label for="author">Neved *</label>
						<input type="text" name="author" id="author" value="<?php echo $comment_author; ?>" size="22" tabindex="1" />
					</li>
					<li>
						<label for="email">Email/gravatar *</label>
						<input type="text" name="email" id="email" value="<?php echo $comment_author_email; ?>" size="22" tabindex="2" />
					</li>

				<?php endif; ?>

				<li>
					<label for="comment">Ezt mondod</label>
					<textarea name="comment" id="comment" rows="10" tabindex="3"></textarea>
				</li>

				<li class="submit">
					<input name="submit" type="submit" id="submit" tabindex="4" value="Mehet" />
				</li>
			</ol>
		</form>
	</div>
<?php endif; ?>
