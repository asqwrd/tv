<?php
ini_set('memory_limit', '-1');
	set_time_limit(0);
	date_default_timezone_set('America/Los_Angeles');
	//$xml = simplexml_load_file('/home/asqwrd/public_html/fullschedule.xml');
	$today = date("F d, Y");
	$hour = date('H');
	$minute = (date('i'));
	$day_now =[];
	//$now = strtotime("$hour:$minute");
	$len_day =0;
	$line="[";
	
	//function
	function xml2array($url, $get_attributes = 1, $priority = 'tag')
{
    $contents = "";
    if (!function_exists('xml_parser_create'))
    {
        return array ();
    }
    $parser = xml_parser_create('');
    if (!($fp = @ fopen($url, 'rb')))
    {
        return array ();
    }
    while (!feof($fp))
    {
        $contents .= fread($fp, 8192);
    }
    fclose($fp);
    xml_parser_set_option($parser, XML_OPTION_TARGET_ENCODING, "UTF-8");
    xml_parser_set_option($parser, XML_OPTION_CASE_FOLDING, 0);
    xml_parser_set_option($parser, XML_OPTION_SKIP_WHITE, 1);
    xml_parse_into_struct($parser, trim($contents), $xml_values);
    xml_parser_free($parser);
    if (!$xml_values)
        return; //Hmm...
    $xml_array = array ();
    $parents = array ();
    $opened_tags = array ();
    $arr = array ();
    $current = & $xml_array;
    $repeated_tag_index = array (); 
    foreach ($xml_values as $data)
    {
        unset ($attributes, $value);
        extract($data);
        $result = array ();
        $attributes_data = array ();
        if (isset ($value))
        {
            if ($priority == 'tag')
                $result = $value;
            else
                $result['value'] = $value;
        }
        if (isset ($attributes) and $get_attributes)
        {
            foreach ($attributes as $attr => $val)
            {
                if ($priority == 'tag')
                    $attributes_data[$attr] = $val;
                else
                    $result['attr'][$attr] = $val; //Set all the attributes in a array called 'attr'
            }
        }
        if ($type == "open")
        { 
            $parent[$level -1] = & $current;
            if (!is_array($current) or (!in_array($tag, array_keys($current))))
            {
                $current[$tag] = $result;
                if ($attributes_data)
                    $current[$tag . '_attr'] = $attributes_data;
                $repeated_tag_index[$tag . '_' . $level] = 1;
                $current = & $current[$tag];
            }
            else
            {
                if (isset ($current[$tag][0]))
                {
                    $current[$tag][$repeated_tag_index[$tag . '_' . $level]] = $result;
                    $repeated_tag_index[$tag . '_' . $level]++;
                }
                else
                { 
                    $current[$tag] = array (
                        $current[$tag],
                        $result
                    ); 
                    $repeated_tag_index[$tag . '_' . $level] = 2;
                    if (isset ($current[$tag . '_attr']))
                    {
                        $current[$tag]['0_attr'] = $current[$tag . '_attr'];
                        unset ($current[$tag . '_attr']);
                    }
                }
                $last_item_index = $repeated_tag_index[$tag . '_' . $level] - 1;
                $current = & $current[$tag][$last_item_index];
            }
        }
        elseif ($type == "complete")
        {
            if (!isset ($current[$tag]))
            {
                $current[$tag] = $result;
                $repeated_tag_index[$tag . '_' . $level] = 1;
                if ($priority == 'tag' and $attributes_data)
                    $current[$tag . '_attr'] = $attributes_data;
            }
            else
            {
                if (isset ($current[$tag][0]) and is_array($current[$tag]))
                {
                    $current[$tag][$repeated_tag_index[$tag . '_' . $level]] = $result;
                    if ($priority == 'tag' and $get_attributes and $attributes_data)
                    {
                        $current[$tag][$repeated_tag_index[$tag . '_' . $level] . '_attr'] = $attributes_data;
                    }
                    $repeated_tag_index[$tag . '_' . $level]++;
                }
                else
                {
                    $current[$tag] = array (
                        $current[$tag],
                        $result
                    ); 
                    $repeated_tag_index[$tag . '_' . $level] = 1;
                    if ($priority == 'tag' and $get_attributes)
                    {
                        if (isset ($current[$tag . '_attr']))
                        { 
                            $current[$tag]['0_attr'] = $current[$tag . '_attr'];
                            unset ($current[$tag . '_attr']);
                        }
                        if ($attributes_data)
                        {
                            $current[$tag][$repeated_tag_index[$tag . '_' . $level] . '_attr'] = $attributes_data;
                        }
                    }
                    $repeated_tag_index[$tag . '_' . $level]++; //0 and 1 index is already taken
                }
            }
        }
        elseif ($type == 'close')
        {
            $current = & $parent[$level -1];
        }
    }
    return ($xml_array);
}

	
	
	
	//end of function
	
	while(empty($day_now)){
		$cmd = 'wget -O "/home/asqwrd/public_html/fullschedule.xml" "http://services.tvrage.com/feeds/fullschedule.php?country=US"';
		exec($cmd);
		$xml = simplexml_load_file('/home/asqwrd/public_html/fullschedule.xml');
		foreach ($xml->DAY as $dayt) {
			$day_attributes_time = $dayt->attributes();

			if($today == date("F d, Y", strtotime($day_attributes_time['attr']))){
				$day_now= $dayt;
				break;
			
			}
			
		}
	}
	foreach ($day_now->time as $time1) {
		$time_attrib1 = $time1->attributes();
		 // echo "<h1>Time: ".$time_attrib['attr']."</h1>";
		
		//if(strtotime($time_attrib1['attr'])>=$now){
			$len_day++;
		 //}
	}
	$j=0;
	
	//print_r($len_day);
	//$day_now_attributes = $day_now->attributes();
	//echo ("<p><h2>Day: ".date("F d, Y", strtotime($day_now_attributes['attr']))."</h2>");
	foreach ($day_now->time as $time) {
		$time_attrib = $time->attributes();
		
			$line .= '{"time":"'.$time_attrib['attr'].'","shows":[';
			$i = 0;
			$showidArray=[];
			echo $time_attrib['attr']."\n";
			  foreach ($time->show as $show) {
				$show_attributes = $show->attributes();
				$len=count($time);
				$nextair="[";
				$url = "http://services.tvrage.com/feeds/full_show_info.php?sid=".$show->sid;
				$image_count=0;
				$xml_images = xml2array($url, $get_attributes = 1, $priority = 'tag');
				while($xml_images['Show']['image']==null || $xml_images['Show']['image'] == ""){
					$xml_images = xml2array($url, $get_attributes = 1, $priority = 'tag');
					echo "Showid: ".$show->sid." in While Loop:- ".$xml_images['Show']['image']."\n";
					$image_count++;
					if($image_count==15){
						echo "Show has no image \n";
						break;
					}
					
				}
				//print_r(array_keys($xml_images['Show']['Episodelist']['Season']));
				//$attr = $xml_images['Show']['Episodelist']['Season']['0_attr'];
				unset($xml_images['Show']['Episodelist']['Season']['0_attr']);
				//$xml_images['Show']['Episodelist']['Season']['0_attr']=$attr;
				array_values($xml_images['Show']['Episodelist']['Season']);
				//print_r(array_keys($xml_images['Show']['Episodelist']['Season']));
				$index=sizeof($xml_images['Show']['Episodelist']['Season'])-1;
				if(is_array($xml_images['Show']['Episodelist']['Season'][$index]['episode'])){
					$season = $xml_images['Show']['Episodelist']['Season'][$index]['episode'];
				}
				else{
					$season = $xml_images['Show']['Episodelist']['Season']['episode'];
				
				}
				$prevseason = $xml_images['Show']['Episodelist']['Season'][$index-1]['episode'];
				//echo "here";
				//print_r($season);
				$nextair='[';
				$prevair="";
				$nextair2="";
				$dateCount=0;
				if((count($season)-1)>=0){
					for($x=0; $x<count($season); $x++){
						if(is_array($season[$x])){
							if($x == count($season)-1){
									/*if(($x-1)<0 && date("F j, Y",strtotime($prevseason[count($prevseason)-1]['airdate']))!=""){
										//$nextair=[];
										
										$nextair .= '"'.date("F j, Y",strtotime($prevseason[count($prevseason)-1]['airdate'])).'",';
										$nextair .= '"'.date("F j, Y",strtotime($season[$x]['airdate'])).'"';
									}
									else{*/
									//print_r($season['airdate']);
									//echo "\n";
										$nextair .= '"'.date("F j, Y",strtotime($season[$x]['airdate'])).'"';
									//}
									
							}
							else{
								
								$nextair .= '"'.date("F j, Y",strtotime($season[$x]['airdate'])).'",';
							
							}
								

						}
						else{
							//print_r($season['airdate']);
							//echo "\n";
							$nextair .= '"'.date("F j, Y",strtotime($season['airdate'])).'"';
							break;
						
						}
					}
	
				}
				else{
							$nextair.= '"Not Available"';
							//$nextair2 = 'none';
							//$prevair = 'Not Available';
						
				}
				$nextair.=']';
				//print_r($nextair);
				
				//$xml_images = simplexml_load_file('http://services.tvrage.com/feeds/full_show_info.php?sid='.$show->sid);
				//foreach($xml_images->image as $image){
					if($i==$len-1){
						$line .= '{"showid":"'.addslashes($show->sid).'","name":"'.addslashes($show_attributes['name']).'","title":"'.addslashes($show->title).'","ep":"'.$show->ep.'","network":"'.addslashes($show->network).'","image":"'.addslashes($xml_images['Show']['image']).'","classification":"'.$xml_images['Show']['classification'].'"}';
					}
					else{
						$line .= '{"showid":"'.addslashes($show->sid).'","name":"'.addslashes($show_attributes['name']).'","title":"'.addslashes($show->title).'","ep":"'.$show->ep.'","network":"'.addslashes($show->network).'","image":"'.addslashes($xml_images['Show']['image']).'","classification":"'.$xml_images['Show']['classification'].'"},';
						$i++;
					}
					//array_push($showidArray,$show->sid);
				  
				}
				//$line = rtrim($line, ",");
				//$line .= ']';

			  $j++;
			 
			if($j<$len_day){
				$line .= ']},';
			  }
			  else{
				$line .= ']}';
			  }
		//break;
	}
	//$line = rtrim($line, ",");
	$line .="]";
	$handle = fopen("/home/asqwrd/public_html/shows_dumb.php", "w");
	fclose($handle);
	$handle = fopen("/home/asqwrd/public_html/shows_dumb.php", "w");
	fwrite($handle,"<?php header('Access-Control-Allow-Origin: *'); echo '");
	fwrite($handle, $line);
	fwrite($handle,"'; ?>");
	fclose($handle);
	
	echo "guide updates \n";

?>