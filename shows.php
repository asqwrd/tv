<?php

	date_default_timezone_set('America/Los_Angeles');
	/*$xml = simplexml_load_file('http://services.tvrage.com/feeds/fullschedule.php?country=US&24_format=1');
	$today = date("F d, Y");
	$hour = date('H');
	$minute = (date('i')>30)?'30':'00';
	$now = strtotime("$hour:$minute");
	$len_day =0;
	$line="";
	foreach ($xml->DAY as $dayt) {
		$day_attributes_time = $dayt->attributes();

		if($today == date("F d, Y", strtotime($day_attributes_time['attr']))){
			$day_now= $dayt;
		
		}
		
	}
	foreach ($day_now->time as $time1) {
		$time_attrib1 = $time1->attributes();
		 // echo "<h1>Time: ".$time_attrib['attr']."</h1>";
		
		if(strtotime($time_attrib1['attr'])>=$now){
			$len_day++;
		 }
	}
	$j=0;
	//print_r($len_day);
	$day_now_attributes = $day_now->attributes();
	//echo ("<p><h2>Day: ".date("F d, Y", strtotime($day_now_attributes['attr']))."</h2>");
	foreach ($day_now->time as $time) {
		$time_attrib = $time->attributes();		
		if(strtotime($time_attrib['attr'])>=$now){
		 $line .= "{time:".'"'.$time_attrib['attr'].'"'.",shows:[";
		 $i = 0;
		  
		  foreach ($time->show as $show) {
			$show_attributes = $show->attributes();
			$len=count($time);
			if($i==$len-1){
				$line .= "{name:".'"'.$show_attributes['name'].'"'.",title:".'"'.$show->title.'"'.",ep:".'"'.$show->ep.'"'.",network:".'"'.$show->network.'"'."}";
			}
			else{
				$line .= "{name:".'"'.$show_attributes['name'].'"'.",title:".'"'.$show->title.'"'.",ep:".'"'.$show->ep.'"'.",network:".'"'.$show->network.'"'."},";
				$i++;
			}
		  }
		  if($j<$len_day-1){
			$line .= "]},";
		  }
		  else{
			$line .= "]}";
		  }
		  $j++;

		}
	}
	
	echo json_encode($line);*/
	$data ="{time:\"16:30\",shows:[{name:\"DocTalk\",title:\"Lowering Somatic Cell Counts on Dairies\",ep:\"03x02\",network:\"RFD-TV\"}]},{time:\"18:00\",shows:[{name:\"PopSugar Now\",title:\"Pilot\",ep:\"01x01\",network:\"TVG Network\"}]},{time:\"18:30\",shows:[{name:\"Dakar Rally Series\",title:\"Season 1, Episode 8\",ep:\"01x08\",network:\"NBCSN\"}]},{time:\"19:00\",shows:[{name:\"E! News\",title:\"2014\/1\/13\",ep:\"23x111\",network:\"E!\"},{name:\"Adventure Time\",title:\"Apple Wedding\",ep:\"05x44\",network:\"Cartoon Network\"},{name:\"College Hockey (ABC)\",title:\"Minnesota at Penn State (LIVE)\",ep:\"05x03\",network:\"Big Ten Network\"},{name:\"College Basketball on NBC\",title:\"College of Charleston at Northeastern (LIVE)\",ep:\"S01-Special\",network:\"NBCSN\"},{name:\"Women\u2019s College Basketball on ABC\",title:\"Big Monday: Connecticut at Baylor (LIVE)\",ep:\"01x18\",network:\"ESPN 2\"},{name:\"Shark Commander\",title:\"Tournament 1: The Season Begins\",ep:\"01x01\",network:\"SPORTSMAN CHANNEL\"}]},{time:\"19:30\",shows:[{name:\"Regular Show\",title:\"Dodge This\",ep:\"05x17\",network:\"Cartoon Network\"},{name:\"The Stream\",title:\"Season 2, Episode 9\",ep:\"02x09\",network:\"Al Jazeera America\"},{name:\"College Basketball on CBS\",title:\"Lafayette at Loyola (MD) (LIVE)\",ep:\"01x61\",network:\"CBS SPORTS NETWORK\"},{name:\"Every Witch Way\",title:\"I Said, Upside Down\",ep:\"01x09\",network:\"nickelodeon\"}]},{time:\"20:00\",shows:[{name:\"How I Met Your Mother\",title:\"Slapsgiving 3: Slappointment in Slapmarra\",ep:\"09x14\",network:\"CBS\"},{name:\"The Bachelor\",title:\"Week 2 (S18)\",ep:\"18x02\",network:\"ABC\"},{name:\"WWE Raw\",title:\"Episode 1077 (Providence, RI)\",ep:\"22x02\",network:\"usa network\"},{name:\"Antiques Roadshow (US)\",title:\"Boise (Hour Two)\",ep:\"18x02\",network:\"PBS\"},{name:\"American Ninja Warrior\",title:\"American Ninja Warrior: USA vs. Japan\",ep:\"S05-Special\",network:\"G4\"},{name:\"The Real Housewives of Beverly Hills\",title:\"Luaus and Lies\",ep:\"04x11\",network:\"Bravo\"},{name:\"Love & Hip Hop\",title:\"Red Alert\",ep:\"03x26\",network:\"VH1\"},{name:\"Switched at Birth\",title:\"Drowning Girl\",ep:\"03x01\",network:\"ABC Family\"},{name:\"Hart Of Dixie\",title:\"Something to Talk About\",ep:\"03x09\",network:\"CW\"},{name:\"Kickin' It\",title:\"How Bobby Got His Groove Back\",ep:\"03x20\",network:\"DiSNEY XD\"},{name:\"Steven Universe\",title:\"Serious Steven\",ep:\"01x08\",network:\"Cartoon Network\"},{name:\"Almost Human\",title:\"You Are Here\",ep:\"01x08\",network:\"FOX\"},{name:\"Music Mavericks\",title:\"The Velvet Underground\",ep:\"01x07\",network:\"OVATION\"},{name:\"Space Voyages\",title:\"Surviving the Void\",ep:\"01x04\",network:\"Smithsonian CHANNEL\"},{name:\"Guns and Ammo TV\",title:\"3-2014\",ep:\"04x02\",network:\"SPORTSMAN CHANNEL\"},{name:\"Bone Collector\",title:\"Nick Mundt heads north of the border into the vast wilderness of Canada, endures 10 all day sits in \",ep:\"06x02\",network:\"Outdoor Channel\"},{name:\"UFC Main Event\",title:\"UFC 132: Cruz vs. Faber (Pilot)\",ep:\"01x01\",network:\"FOX SPORTS 1\"},{name:\"Lost Girl\",title:\"In Memoriam\",ep:\"04x01\",network:\"Syfy\"}]},{time:\"20:30\",shows:[{name:\"2 Broke Girls\",title:\"And The Big But\",ep:\"03x13\",network:\"CBS\"},{name:\"Mighty Med\",title:\"Evil Gus\",ep:\"01x08\",network:\"DiSNEY XD\"}]},{time:\"21:00\",shows:[{name:\"Fashion Police\",title:\"The 2014 Golden Globe Awards\",ep:\"S09-Special\",network:\"E!\"},{name:\"Cake Boss\",title:\"Next Great Bride\",ep:\"07x05\",network:\"TLC\"},{name:\"Being Human (US)\",title:\"Old Dogs, New Tricks\",ep:\"04x01\",network:\"Syfy\"},{name:\"Mike & Molly\",title:\"What Molly Hath Wrought\",ep:\"04x08\",network:\"CBS\"},{name:\"Single Ladies\",title:\"Where There's a Will\",ep:\"03x02\",network:\"VH1\"},{name:\"Major Crimes\",title:\"Return to Sender Part 2\",ep:\"02x19\",network:\"Turner Network Television\"},{name:\"Brain Games\",title:\"In Living Color\",ep:\"03x01\",network:\"NATIONAL GEOGRAPHIC CHANNEL\"},{name:\"Rachael vs. Guy Celebrity Cook Off\",title:\"Leis in the Fray\",ep:\"03x02\",network:\"food network\"},{name:\"Hot Shots (2012)\",title:\"Slinging In The Rain\",ep:\"03x03\",network:\"SPORTSMAN CHANNEL\"},{name:\"Beauty and the Beast (2012)\",title:\"Don't Die on Me\",ep:\"02x09\",network:\"CW\"},{name:\"Lab Rats (2012)\",title:\"No Going Back\",ep:\"02x26\",network:\"DiSNEY XD\"},{name:\"Fast N' Loud\",title:\"Fast N' LIVE: Uncensored\",ep:\"S04-Special\",network:\"Discovery Channel\"},{name:\"Vanderpump Rules\",title:\"Ultimatum\",ep:\"02x11\",network:\"Bravo\"},{name:\"The Fosters (2013)\",title:\"The Honeymoon\",ep:\"01x11\",network:\"ABC Family\"},{name:\"Sleepy Hollow\",title:\"Vessel\",ep:\"01x11\",network:\"FOX\"},{name:\"Highway Thru Hell: USA\",title:\"Beer O'Clock\",ep:\"02x12\",network:\"Weather Channel\"},{name:\"Guitar Center Sessions\",title:\"Papa Roach\",ep:\"02x02\",network:\"AXStv\"},{name:\"Murder Comes to Town\",title:\"Rumor Has It\",ep:\"01x01\",network:\"Investigation Discovery\"},{name:\"Skiing on NBC\",title:\"U.S. Freeskiing Grand Prix: Halfpipe\",ep:\"01x04\",network:\"NBCSN\"},{name:\"Love It or List It\",title:\"Bachelor Pad Blues\",ep:\"06x15\",network:\"HGTV\"}]},{time:\"21:30\",shows:[{name:\"Cake Boss\",title:\"Carlo's Cowboys\",ep:\"07x06\",network:\"TLC\"},{name:\"Lizard Lick Towing\",title:\"Season 4, Episode 5\",ep:\"04x05\",network:\"truTV\"},{name:\"Brain Games\",title:\"Laws of Attraction\",ep:\"03x02\",network:\"NATIONAL GEOGRAPHIC CHANNEL\"},{name:\"Mom\",title:\"Hot Soup and Shingles\",ep:\"01x13\",network:\"CBS\"},{name:\"Red Steagall Is Somewhere West of Wall Street\",title:\"National Ranching Heritage Center\",ep:\"01x03\",network:\"RFD-TV\"},{name:\"Heartland Waterfowl\",title:\"Redemption\",ep:\"01x03\",network:\"Outdoor Channel\"}]},{time:\"22:00\",shows:[{name:\"House Hunters\",title:\"Unrealistic First-Timers in Reno, Nevada\",ep:\"53x08\",network:\"HGTV\"},{name:\"Independent Lens\",title:\"At Berkeley\",ep:\"15x08\",network:\"PBS\"},{name:\"Castle (2009)\",title:\"Deep Cover\",ep:\"06x12\",network:\"ABC\"},{name:\"Full Throttle Saloon\",title:\"Crunch Time\",ep:\"05x07\",network:\"truTV\"},{name:\"Archer (2009)\",title:\"White Elephant\",ep:\"05x01\",network:\"FX\"},{name:\"Bath Crashers\",title:\"Dog's Best Bathroom\",ep:\"08x12\",network:\"diy network\"},{name:\"Stalked: Someone's Watching\",title:\"Predator by Proxy\",ep:\"04x08\",network:\"Investigation Discovery\"},{name:\"Teen Wolf\",title:\"More Bad Than Good\",ep:\"03x14\",network:\"MTV\"},{name:\"Hotel Impossible\",title:\"Casa Verde Undercover\",ep:\"S04-Special\",network:\"travel CHANNEL\"},{name:\"Mystery Diners\",title:\"Fired Up\",ep:\"05x02\",network:\"food network\"},{name:\"Intelligence (US)\",title:\"Red X\",ep:\"01x02\",network:\"CBS\"},{name:\"The Blacklist\",title:\"The Good Samaritan Killer\",ep:\"01x11\",network:\"NBC\"},{name:\"Fatal Attraction (2013)\",title:\"Murder in Niagara\",ep:\"02x05\",network:\"TV one\"},{name:\"Bakery Boss\",title:\"Lidia's Bakeshop & Cafe\",ep:\"01x06\",network:\"TLC\"},{name:\"Street Outlaws\",title:\"Straight Out to Cali\",ep:\"01x16\",network:\"Discovery Channel\"},{name:\"Buying Hawaii\",title:\"Boar Island\",ep:\"01x09\",network:\"Destination America\"},{name:\"Women's College Gymnastics on Pac-12 Network\",title:\"Minnesota at Washington (LIVE)\",ep:\"02x02\",network:\"Pac-12 Network\"},{name:\"Don\u2019t Trust Andrew Mayne\",title:\"Father of Anarchy\",ep:\"01x01\",network:\"A&E\"},{name:\"The New College Football Show: Next Class\",title:\"Pilot (LIVE)\",ep:\"01x01\",network:\"FOX COLLEGE SPORTS ATLANTIC\"},{name:\"Duck Quacks Don't Echo\",title:\"Hovercraft Grand Prix\",ep:\"01x01\",network:\"NATIONAL GEOGRAPHIC CHANNEL\"},{name:\"Bitten\",title:\"Summons\",ep:\"01x01\",network:\"Syfy\"}]},{time:\"22:30\",shows:[{name:\"House Hunters International\",title:\"San Juan-a-be Startin' Somethin'\",ep:\"36x03\",network:\"HGTV\"},{name:\"Bath Crashers\",title:\"Functional, Funky Formula\",ep:\"08x13\",network:\"diy network\"},{name:\"Hotel Impossible\",title:\"Triangle T Ranch Undercover\",ep:\"S04-Special\",network:\"travel CHANNEL\"},{name:\"Rick and Morty\",title:\"M. Night Shaym-Aliens!\",ep:\"01x04\",network:\"Adult Swim\"},{name:\"Chozen\",title:\"Pilot\",ep:\"01x01\",network:\"FX\"},{name:\"Don\u2019t Trust Andrew Mayne\",title:\"Disconnected\",ep:\"01x02\",network:\"A&E\"},{name:\"Duck Quacks Don't Echo\",title:\"Crushed by a Truck\",ep:\"01x02\",network:\"NATIONAL GEOGRAPHIC CHANNEL\"}]},{time:\"23:00\",shows:[{name:\"The Daily Show\",title:\"Roger Ross Williams\",ep:\"19x45\",network:\"Comedy Central\"},{name:\"Chelsea Lately\",title:\"Taylor Schilling, Giulia Rozzi, Josh Wolf, Loni Love\",ep:\"08x07\",network:\"E!\"},{name:\"Watch What Happens: Live\",title:\"Kristen Doute & Tom Sandoval\",ep:\"10x118\",network:\"Bravo\"},{name:\"Conan\",title:\"Courteney Cox, John Leguizamo, Jamestown Revival\",ep:\"04x29\",network:\"tbs\"},{name:\"The World's Greatest Tribute Bands\",title:\"Bella Donna: A Tribute to Stevie Nicks (LIVE)\",ep:\"03x02\",network:\"AXStv\"},{name:\"Wolf Watch\",title:\"Max and Charlie Carver discuss ``More Bad Than Good''; a clip of next week's episode.\",ep:\"01x02\",network:\"MTV\"},{name:\"Cracked\",title:\"The Price\",ep:\"02x02\",network:\"REELZ\"}]},{time:\"23:30\",shows:[{name:\"The Colbert Report\",title:\"David Fanning\",ep:\"10x45\",network:\"Comedy Central\"}]},{time:\"23:35\",shows:[{name:\"Jimmy Kimmel Live\",title:\"Kevin Costner, Harry Connick Jr., Kevin Costner & Modern West\",ep:\"11x190\",network:\"ABC\"},{name:\"Late Show with David Letterman\",title:\"Bill Cosby, Sleigh Bells\",ep:\"21x68\",network:\"CBS\"},{name:\"The Tonight Show with Jay Leno\",title:\"Jennifer Lopez, Aaron Eckhart, Dorian Holley\",ep:\"21x227\",network:\"NBC\"}]},{time:\"23:55\",shows:[{name:\"Tavis Smiley\",title:\"Michael Kimmel, Johnny Rivers\",ep:\"11x15\",network:\"PBS\"}]},{time:\"23:59\",shows:[{name:\"Take Part Live\",title:\"Season 2, Episode 5\",ep:\"02x05\",network:\"pivot\"},{name:\"King (2011)\",title:\"Josh Simpson\",ep:\"02x02\",network:\"REELZ\"}]}";
	
	echo json_encode($data);
	


?>