/**
 * linksyouthoverview.js
 * Foxtrick add links to youth overview pages
 * @author convinced
 */

////////////////////////////////////////////////////////////////////////////////
var FoxtrickLinksYouthOverview = {
	
    MODULE_NAME : "LinksYouthOverview",
	MODULE_CATEGORY : Foxtrick.moduleCategories.LINKS,
	PAGES : new Array('youthoverview'), 
	DEFAULT_ENABLED : true,
	OPTIONS : {}, 	

    init : function() {
			Foxtrick.initOptionsLinks(this,"youthlink");	
	    },

    run : function( page, doc ) {
		var boxleft=doc.getElementById('ctl00_pnlSubMenu');
		if (boxleft==null) {return;}
		var teamid=FoxtrickHelper.findTeamId(boxleft); 
		if (teamid=="") {return;}
		var ownteamid = FoxtrickHelper.getOwnTeamId();
		var owncountryid = FoxtrickHelper.getOwnCountryId();					
		var youthteamid = FoxtrickHelper.findYouthTeamId(doc.getElementById('mainWrapper'));
		var server = FoxtrickPrefs.getBool("hty-stage")?'stage':'www';
	
	
		//addExternalLinksToYouthOverview
        var ownBoxBody=null;
		var links = Foxtrick.LinkCollection.getLinks("youthlink", { "ownteamid":ownteamid,"teamid":teamid,"youthteamid":youthteamid, "owncountryid": owncountryid, 'server':server  }, doc,this);  
		if (links.length > 0) {
			ownBoxBody = doc.createElement("div");
			var header = Foxtrickl10n.getString(
						"foxtrick.links.boxheader" );
			var ownBoxId = "foxtrick_links_box";
			var ownBoxBodyId = "foxtrick_links_content";
			ownBoxBody.setAttribute( "id", ownBoxBodyId );
                                
			for (var k = 0; k < links.length; k++) {
				links[k].link.className ="inner";
				ownBoxBody.appendChild(links[k].link);
			}
			Foxtrick.addBoxToSidebar( doc, header, ownBoxBody, ownBoxId, "first", "");
		}
		FoxtrickLinksCustom.add( page, doc,ownBoxBody,this.MODULE_NAME ,{});			
    },
	
};



////////////////////////////////////////////////////////////////////////////////
var FoxtrickLinksYouthPlayerDetail = {
	
    MODULE_NAME : "LinksYouthPlayerDetail",
	MODULE_CATEGORY : Foxtrick.moduleCategories.LINKS,
	PAGES : new Array('youthplayerdetail'), 
	DEFAULT_ENABLED : true,
	OPTIONS : {}, 	

    init : function() {
			Foxtrick.initOptionsLinks(this,"youthplayerdetaillink");	
	    },

    run : function( page, doc ) {
		var boxleft=doc.getElementById('ctl00_pnlSubMenu');
		if (boxleft==null) {return;}
		var teamid=FoxtrickHelper.findTeamId(boxleft); 
		if (teamid=="") {return;}
		var ownteamid = FoxtrickHelper.getOwnTeamId();
		var owncountryid = FoxtrickHelper.getOwnCountryId();					
		var youthteamid = FoxtrickHelper.findYouthTeamId(doc.getElementById('mainWrapper'));
		var server = FoxtrickPrefs.getBool("hty-stage")?'stage':'www';
	
		var alldivs = doc.getElementById('mainWrapper').getElementsByTagName('div');
		for (var j = 0; j < alldivs.length; j++) {
			if (alldivs[j].className=="main mainRegular") {
				var thisdiv = alldivs[j];
				var nationality = FoxtrickHelper.findCountryId(thisdiv);
				var playerid = FoxtrickHelper.findPlayerId(thisdiv);
				var playername=thisdiv.getElementsByTagName("a")[1].innerHTML;;
				var age = null;
				var age_days;
								
				// age
				var divs= thisdiv.getElementsByTagName('div');
				for (var j=0; j < divs.length; j++) {
					if ( divs[j].className=="byline" ) { 
						age = divs[j].textContent.match(/\d+/)[0];
						age_days = divs[j].textContent.match(/(\d+)/g)[1]; 
						break;
					}
				} 
				break;
			}
		}
	
		//addExternalLinksToYouthdetail
        var ownBoxBody=null;
		var links = Foxtrick.LinkCollection.getLinks("youthplayerdetaillink", { "ownteamid":ownteamid,"teamid":teamid,"youthteamid":youthteamid, "playerid" : playerid, "age" : age, "age_days":age_days, "owncountryid": owncountryid, 'server':server }, doc,this);  
		if (links.length > 0) {
			ownBoxBody = doc.createElement("div");
			var header = Foxtrickl10n.getString(
						"foxtrick.links.boxheader" );
			var ownBoxId = "foxtrick_links_box";
			var ownBoxBodyId = "foxtrick_links_content";
			ownBoxBody.setAttribute( "id", ownBoxBodyId );
                                
			for (var k = 0; k < links.length; k++) {
				links[k].link.className ="inner";
				ownBoxBody.appendChild(links[k].link);
			}
			Foxtrick.addBoxToSidebar( doc, header, ownBoxBody, ownBoxId, "first", "");
		}
		FoxtrickLinksCustom.add( page, doc,ownBoxBody,this.MODULE_NAME ,{});			
    },
	
};



////////////////////////////////////////////////////////////////////////////////
var FoxtrickLinksYouthTraining = {
	
    MODULE_NAME : "LinksYouthTraining",
	MODULE_CATEGORY : Foxtrick.moduleCategories.LINKS,
	PAGES : new Array('YouthTraining'), 
	DEFAULT_ENABLED : true,
	OPTIONS : {}, 	

    init : function() {
			Foxtrick.initOptionsLinks(this,"youthtraininglink");	
	    },

    run : function( page, doc ) {
		var boxleft=doc.getElementById('ctl00_pnlSubMenu');
		var ownteamid=0;
		var owncountryid=0;
		if (boxleft==null) {return;}
		var teamid=FoxtrickHelper.findTeamId(boxleft); 
		if (teamid=="") {return;}
		var ownteamid = FoxtrickHelper.getOwnTeamId();
		var owncountryid = FoxtrickHelper.getOwnCountryId();					
		var youthteamid = FoxtrickHelper.findYouthTeamId(doc.getElementById('mainWrapper'));
		var server = FoxtrickPrefs.getBool("hty-stage")?'stage':'www';
	
	
	
		//addExternalLinksToYouthOverview
        var ownBoxBody=null;
		var links = Foxtrick.LinkCollection.getLinks("youthtraininglink", { "ownteamid":ownteamid,"teamid":teamid,"youthteamid":youthteamid, "owncountryid": owncountryid, 'server':server  }, doc,this);  
		if (links.length > 0) {
			ownBoxBody = doc.createElement("div");
			var header = Foxtrickl10n.getString(
						"foxtrick.links.boxheader" );
			var ownBoxId = "foxtrick_links_box";
			var ownBoxBodyId = "foxtrick_links_content";
			ownBoxBody.setAttribute( "id", ownBoxBodyId );
                                
			for (var k = 0; k < links.length; k++) {
				links[k].link.className ="inner";
				ownBoxBody.appendChild(links[k].link);
			}
			Foxtrick.addBoxToSidebar( doc, header, ownBoxBody, ownBoxId, "first", "");
		}
		FoxtrickLinksCustom.add( page, doc,ownBoxBody,this.MODULE_NAME ,{});			
    },
	
};

////////////////////////////////////////////////////////////////////////////////
var FoxtrickLinksYouthPlayerlist = {
	
    MODULE_NAME : "LinksYouthPlayerlist",
	MODULE_CATEGORY : Foxtrick.moduleCategories.LINKS,
	PAGES : new Array('YouthPlayers'), 
	DEFAULT_ENABLED : true,
	OPTIONS : {}, 	

    init : function() {
			Foxtrick.initOptionsLinks(this,"youthplayerlistlink");	
	    },

    run : function( page, doc ) {
		var boxleft=doc.getElementById('ctl00_pnlSubMenu');
		var ownteamid=0;
		var owncountryid=0;
		if (boxleft==null) {return;}
		var teamid=FoxtrickHelper.findTeamId(boxleft); 
		if (teamid=="") {return;}
		var ownteamid = FoxtrickHelper.getOwnTeamId();
		var owncountryid = FoxtrickHelper.getOwnCountryId();					
		var youthteamid = FoxtrickHelper.findYouthTeamId(doc.getElementById('mainWrapper'));
		var server = FoxtrickPrefs.getBool("hty-stage")?'stage':'www';
		
	
		//addExternalLinksToYouthOverview
        var ownBoxBody=null;
		var links = Foxtrick.LinkCollection.getLinks("youthplayerlistlink", {  "ownteamid":ownteamid,"teamid":teamid,"youthteamid":youthteamid, "owncountryid": owncountryid, 'server':server  }, doc,this);  
		if (links.length > 0) {
			ownBoxBody = doc.createElement("div");
			var header = Foxtrickl10n.getString(
						"foxtrick.links.boxheader" );
			var ownBoxId = "foxtrick_links_box";
			var ownBoxBodyId = "foxtrick_links_content";
			ownBoxBody.setAttribute( "id", ownBoxBodyId );
                                
			for (var k = 0; k < links.length; k++) {
				links[k].link.className ="inner";
				ownBoxBody.appendChild(links[k].link);
			}
			Foxtrick.addBoxToSidebar( doc, header, ownBoxBody, ownBoxId, "first", "");
		}
		FoxtrickLinksCustom.add( page, doc,ownBoxBody,this.MODULE_NAME ,{});			
    },
	
};

////////////////////////////////////////////////////////////////////////////////
var FoxtrickLinksYouthMatchlist = {
	
    MODULE_NAME : "LinksYouthMatchlist",
	MODULE_CATEGORY : Foxtrick.moduleCategories.LINKS,
	PAGES : new Array('YouthMatchlist'), 
	DEFAULT_ENABLED : true,
	OPTIONS : {}, 	

    init : function() {
			Foxtrick.initOptionsLinks(this,"youthmatchlistlink");	
	    },

    run : function( page, doc ) {
		var boxleft=doc.getElementById('ctl00_pnlSubMenu');
		var ownteamid=0;
		var owncountryid=0;
		if (boxleft==null) {return;}
		var teamid=FoxtrickHelper.findTeamId(boxleft); 
		if (teamid=="") {return;}
		var ownteamid = FoxtrickHelper.getOwnTeamId();
		var owncountryid = FoxtrickHelper.getOwnCountryId();					
		var youthteamid = FoxtrickHelper.findYouthTeamId(doc.getElementById('mainWrapper'));
		var server = FoxtrickPrefs.getBool("hty-stage")?'stage':'www';
		
	
		//addExternalLinksToYouthOverview
        var ownBoxBody=null;
		var links = Foxtrick.LinkCollection.getLinks("youthmatchlistlink", { "ownteamid":ownteamid,"teamid":teamid,"youthteamid":youthteamid, "owncountryid": owncountryid, 'server':server  }, doc,this);  
		if (links.length > 0) {
			ownBoxBody = doc.createElement("div");
			var header = Foxtrickl10n.getString(
						"foxtrick.links.boxheader" );
			var ownBoxId = "foxtrick_links_box";
			var ownBoxBodyId = "foxtrick_links_content";
			ownBoxBody.setAttribute( "id", ownBoxBodyId );
                                
			for (var k = 0; k < links.length; k++) {
				links[k].link.className ="inner";
				ownBoxBody.appendChild(links[k].link);
			}
			Foxtrick.addBoxToSidebar( doc, header, ownBoxBody, ownBoxId, "first", "");
		}
		FoxtrickLinksCustom.add( page, doc,ownBoxBody,this.MODULE_NAME ,{});			
    },
	
};
