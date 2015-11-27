<?php
$path = "";

if(isset($_POST['data'])) {
    // split the data URL at the comma
    $dataImg = explode(',', $_POST['data']);
    $dataImg = base64_decode(trim($dataImg[1]));
    
    // decode the base64 into binary data
    $folder = 'images';
    if (!is_dir($folder)) {
        mkdir($folder, 0777, true);
    }
    
    $filename = sprintf('img_%s%03d.jpg', $path, uniqid());
    file_put_contents($folder . '/' . $filename, $dataImg);
    
    echo $folder . '/' . $filename;
}
