<?php
// ----------------------------------------------------------------------------
// ClickTracker, jQuery plugin to track users clicks
// v 1.2 beta
// Dual licensed under the MIT and GPL licenses.
// ----------------------------------------------------------------------------
// Copyright (C) 2009 Jay Salvat
// http://www.jaysalvat.com/
// ----------------------------------------------------------------------------
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
// ----------------------------------------------------------------------------

mysql_connect("localhost", "root", "root"); 
mysql_select_db("clicktracker");      
 
if (isset($_POST['l'])) { 
    $query = sprintf("  INSERT INTO `clicktracker` 
                        SET x = '%s', y = '%s', location = '%s', element = '%s'",  
                        mysql_real_escape_string($_POST['x']), 
						mysql_real_escape_string($_POST['y']), 
						mysql_real_escape_string($_POST['l']), 
						mysql_real_escape_string($_POST['e']));        
    $result = mysql_query($query); 
} 
 
if (isset($_GET['l'])) { 
    $query = sprintf("  SELECT x, y FROM `clicktracker`  
                        WHERE location = '%s' and element = '%s' 
                        ORDER BY id DESC",  
                        mysql_real_escape_string($_GET['l']), 
						mysql_real_escape_string($_GET['e'])); 
    $results = mysql_query($query); 
         
    $html = '';
	while ($row = mysql_fetch_array($results)) { 
        $html .= sprintf('<div style="left:%spx;top:%spx"></div>', $row['x'] - 10, $row['y'] - 10); 
    } 
    echo $html; 
} 

mysql_close(); 
?> 