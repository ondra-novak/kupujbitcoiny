include config.mk
-include project.deps

all:  project.json

project.json: 
	couchapp push src "$(COUCHDBURL)"
	couchapp push --export --output project.json src 
	FILES=`find src -exec echo -n "{} " \;`;echo "project.json : $$FILES" > project.deps


clean:
	rm -f project.json project.deps
	
	
	
  