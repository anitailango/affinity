# Affinity

'outlet_data.csv' stores the article bias ratings which assumes same bias per outlet.  
'final_data.csv' stores the article bias ratings with individual rating per article. 

For Outlet Data:
Articles are based on  'articles1.csv', 'articles2.csv', 'articles3.csv' (no bias rating)

For Final Data:
Articles are based on 'Interactive Media Bias Chart - Ad Fontes Media.csv'

## Data Pipeline
1.) API retrieves JSONs
2.) json_extract.py converts JSONs to CSV 
3.) process_raw.py cleans CSV 
4.) final_data.csv
