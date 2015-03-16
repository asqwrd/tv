<?php
	set_time_limit(0);
	date_default_timezone_set('America/Los_Angeles');
	$xml = simplexml_load_file('show_list.php.xml');
	$today = date("F d, Y");
	$hour = date('H');
	$minute = (date('i')>=30)?'30':'00';
	$now = strtotime("$hour:$minute");
	$len_day =0;
	$line="[";
	$j=0;
	//print_r($xml->show);
	foreach ($xml->show as $show) {
			$i = 0;
			$len=count($xml->shows);
			$xml_images = simplexml_load_file('http://services.tvrage.com/feeds/full_show_info.php?sid='.$show->id);
			//foreach($xml_images->image as $image){
			if($i==$len-1){
				$line .= '{"sid":"'.addslashes($show->id).'","name":"'.addslashes($show->name).'","status":"'.$xml_images->status.'","network":"'.addslashes($show->network).'","country":"'.$show->country.'","seasons":"'.$xml_images->totalseasons.'","image":"'.addslashes($xml_images->image).'"}';
			}
			else{
				$line .= '{"sid":"'.addslashes($show->id).'","name":"'.addslashes($show->name).'","status":"'.$xml_images->status.'","network":"'.addslashes($show->network).'","country":"'.$show->country.'","seasons":"'.$xml_images->totalseasons.'","image":"'.addslashes($xml_images->image).'"},';
				$i++;
			}			  
	}
	if($j<$len_day-1){
		$line .= ']},';
	}
	else{
		$line .= ']}';
	}
	$j++;
	$line .="]";
	$handle = fopen("allshows_dump.php", "w");
	fclose($handle);
	$handle = fopen("allshows_dump.php", "w");
	fwrite($handle,"<?php header('Access-Control-Allow-Origin: *'); echo '");
	fwrite($handle, $line);
	fwrite($handle,"'; ?>");
	fclose($handle);
	
	echo "shows list updates";

?>