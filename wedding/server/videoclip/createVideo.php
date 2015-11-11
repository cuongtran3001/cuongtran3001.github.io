<?php
		
	$name = $_POST['name'];
	
	shell_exec("ffmpeg -i audios/XotXa.mp3 -start_number 0 -i frames/" . $name . "/img_%03d.jpg -c:v libx264 -t 10 -pix_fmt yuv420p videos/" . $name . ".mp4");
	echo "videos/" . $name . ".mp4";
?>
