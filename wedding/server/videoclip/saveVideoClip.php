<?php

$videoClipId = $_POST['vcid'];

if(isset($videoClipId)) {
    //create folders if not exist
    if (!is_dir('frames')) {
        mkdir('frames', 0777, true);
    }

    $folder = 'frames/' . $videoClipId;
    
    if (!is_dir($folder)) {
        mkdir($folder, 0777, true);
    }

    $path = $folder . '/';
}

$data = $_POST['data'];

$filename = sprintf($videoClipId. '.json', $path);
file_put_contents($folder . '/' . $filename, $data);

echo "server/videoclip/$folder/$filename";
