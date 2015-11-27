<?php

$videoClipId = $_POST['vcid'];

if(isset($videoClipId)) {
    //create folders if not exist
    if (!is_dir('frames')) {
        mkdir('frames', 0777, true);
    }

    $folder = 'frames/' . $videoClipId;
    $images = 'frames/' . $videoClipId . '/images';
    $audios = 'frames/' . $videoClipId . '/audios';
    $videos = 'frames/' . $videoClipId . '/videos';

    if (!is_dir($folder)) {
        mkdir($folder, 0777, true);
    }

    if (!is_dir($images)) {
        mkdir($images, 0777, true);
    }

    if (!is_dir($audios)) {
        mkdir($audios, 0777, true);
    }
    
    if (!is_dir($videos)) {
        mkdir($videos, 0777, true);
    }
}

$fileType = $_POST['type'];

if(isset($fileType)) {

    $path = $images;

    if ($fileType == 'audio') {
        $path = $audios;
    }

    else if ($fileType == 'video') {
        $path = $videos;
    }

    $fileName = $_FILES["file"]["name"];
    $fileTemp = $_FILES["file"]["tmp_name"];

    if(move_uploaded_file($fileTemp, "$path/$fileName")){
        echo "server/videoclip/" . "$path/$fileName";
    }
}
