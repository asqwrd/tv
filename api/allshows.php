<?php
ini_set('memory_limit', '-1');
	set_time_limit(0);
	$cmd = 'wget -O "/home/asqwrd/public_html/allshows.xml" "http://services.tvrage.com/feeds/show_list.php"';
	exec($cmd);
	date_default_timezone_set('America/Los_Angeles');
	$xml = simplexml_load_file('/home/asqwrd/public_html/allshows.xml');
	$today = date("F d, Y");
	$hour = date('H');
	$minute = (date('i'));
	$now = strtotime("$hour:$minute");
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
	/*foreach ($xml->Shows as $shows) {
		//$time_attrib1 = $time1->attributes();
		 // echo "<h1>Time: ".$time_attrib['attr']."</h1>";
		foreach ($shows->show as $show) {
			if($show->status == 1){
				$len_day++;
			 }
		}
	}
	$j=0;*/
	
	$dateCount=0;
	//foreach ($xml->shows as $shows) {

	foreach ($xml->show as $show) {
		//$time_attrib = $time->attributes();
		
		if(($show->status % 2 !=0 )&&($show->status < 13)){
			//$line .= '{"time":"'.$time_attrib['attr'].'",";
			$i = 0;
			$showidArray=[];
			 // foreach ($time->show as $show) {
				//$show_attributes = $show->attributes();
				$len=count($show);
				$url = "http://services.tvrage.com/feeds/full_show_info.php?sid=".$show->id;
				$image_count=0;
				$xml_images = xml2array($url, $get_attributes = 1, $priority = 'tag');
				while($xml_images['Show']['image']==null || $xml_images['Show']['image'] == ""){
					$xml_images = xml2array($url, $get_attributes = 1, $priority = 'tag');
					echo "Show: ".$show->name." searching for image- showid: ".$show->id."\n";
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
				$index=count($xml_images['Show']['Episodelist']['Season'])-1;
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
				//echo count($season)."\n";
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
			//	print_r($nextair);
				//echo "\n";
				
				//$xml_images = simplexml_load_file('http://services.tvrage.com/feeds/full_show_info.php?sid='.$show->sid);
				//foreach($xml_images->image as $image){
					if($i==$len-1){
						$line .= '{"nextair":'.$nextair.',"status":"'.$xml_images['Show']['status'].'","time":"'.date('h:i a', strtotime($xml_images['Show']['airtime'])).'","showid":"'.addslashes($show->id).'","name":"'.addslashes($show->name).'","day":"'.$xml_images['Show']['airday'].'","seasons":"'.$xml_images['Show']['totalseasons'].'","network":"'.addslashes($xml_images['Show']['network']).'","image":"'.addslashes($xml_images['Show']['image']).'"}';
						echo ($dateCount+1)." - ".$show->name." Object last one created \n";
					}
					else{
						$line .= '{"nextair":'.$nextair.',"status":"'.addslashes($xml_images['Show']['status']).'","time":"'.date('h:i a', strtotime($xml_images['Show']['airtime'])).'","showid":"'.addslashes($show->id).'","name":"'.addslashes($show->name).'","day":"'.$xml_images['Show']['airday'].'","seasons":"'.$xml_images['Show']['totalseasons'].'","network":"'.addslashes($xml_images['Show']['network']).'","image":"'.addslashes($xml_images['Show']['image']).'"},';
						$i++;
						echo ($dateCount+1)." - ".$show->name." Object created \n";
						

					}
					
					
					$dateCount++;
					//array_push($showidArray,$show->sid);
				  
				//}
				//$line .= ']';

			  //$j++;
			  /*$len_showid = count($showidArray);
			  $line .= ',"showidArray":[';
			 for($x=0; $x<$len_showid; $x++){
				 if($x<$len_showid-1){
					$line .= $showidArray[$x].",";
				}else{
					$line .= $showidArray[$x];
				
				}
			}
			if($j<$len_day){
				$line .= ']},';
			  }
			  else{
				$line .= ']}';
			  }*/
		}
		
		/*if($dateCount==10)
			break;*/
	}
	//}
	$line = rtrim($line, ",");
	$line .="]";
	$handle = fopen("/home/asqwrd/public_html/shows_dumb3.php", "w");
	fclose($handle);
	$handle = fopen("/home/asqwrd/public_html/shows_dumb3.php", "w");
	fwrite($handle,"<?php header('Access-Control-Allow-Origin: *'); echo '");
	fwrite($handle, $line);
	fwrite($handle,"'; ?>");
	fclose($handle);
	
	echo "all ".($dateCount+1)." shows are updates \n";

?>