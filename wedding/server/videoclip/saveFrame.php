<?php
$path = "";

if(isset($_POST['data']) && isset($_POST['name']) && isset($_POST['i']) && is_numeric($_POST['i'])) {
    // split the data URL at the comma
    $data = explode(',', $_POST['data']);
    // decode the base64 into binary data
    $data = base64_decode(trim($data[1]));
	
	$name = $_POST['name'];
	
	mkdir('frames/' . $name, 0777, true);
	
 
    // create the numbered image file
    $filename = sprintf('img_%s%03d.jpg', $path, $_POST['i']);
    file_put_contents('frames/' . $name . '/' . $filename, $data);
}
