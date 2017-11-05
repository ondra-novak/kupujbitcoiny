#!/bin/bash

DBURL="http://localhost:5984/autocoin"
TMPFILE=/tmp/autocoin_maildaemon_tmp;


function prepareEmail {
	read SEQID
	read ID
	read TEMPLATE
	
	
	if [ "$ID" != "null" ]; then  
	
		curl -s "$DBURL/_design/src/_show/$TEMPLATE/$ID"
		curl -s $DBURL/_local/cur_mail_pos | jq ".from_seq = $SEQID" | curl -X PUT -d @-  -H "Content-Type: application/json" $DBURL/_local/cur_mail_pos
	fi
}

 while true; do 	
	CURSEQDOC=`curl -s $DBURL/_local/cur_mail_pos`
	FROMSEQ=`echo $CURSEQDOC | jq -r .from_seq`
	if [ "$FROMSEQ" == "null" ]; then
		echo Local document cur_mail_pos doesn't exist or doesn't have field 'from_seq'
		exit
	fi
	
	curl -s "$DBURL/_changes?since=$FROMSEQ&filter=src/emails&include_docs=true&limit=1&feed=longpoll" |
		jq -r .last_seq,.results[0].id,.results[0].doc.template |
		prepareEmail


 done