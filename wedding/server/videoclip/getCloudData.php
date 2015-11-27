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

    $url = $_POST['url'];
    $img = $path . '/' . uniqid() . '.jpg';
    $context = null;

    if (isset($_POST["at"])) {
        $opts = array(
            'http'=>array(
            'method'=> 'GET',
            'header'=> 'Authorization: Bearer ' . $_POST["at"]
            )
        );
        $context = stream_context_create($opts);
    }

    file_put_contents($img, file_get_contents($url, false, $context));
    echo "server/videoclip/" . "$img";
}
