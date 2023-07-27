<?php

$contents='aaaa <img src="aaa.gif"> ddddd


dddd


ddd

<img src="aabbbbsa.gif">
ddd
';


//정규표현식
preg_match_all("/<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/i", $contents, $matches);

print_r($matches);