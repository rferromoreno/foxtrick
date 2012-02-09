"use strict";
/*
 * loyalty-display.js
 * Extends the skill bar representation with a version that reflects the Homegrown/loyalty bonus
 * @author CatzHoek
 */

Foxtrick.modules["LoyaltyDisplay"]={
	MODULE_CATEGORY : Foxtrick.moduleCategories.PRESENTATION,
	PAGES : ['players', 'playerdetail'],
	CSS : Foxtrick.InternalPath + "resources/css/loyalty-display.css",
	
	run : function(doc) {
	
		if(Foxtrick.isPage('players', doc) && !Foxtrick.Pages.Players.isOwnPlayersPage(doc))
			return;
		
		var replacePercentageImage = function(player, bars){
			//FIXME: Delete next season
			var halfEffect = true;
			//FIXME: end
			
			var loyalty = player.Loyalty;
			if(loyalty === undefined)
				loyalty  = player.loyalty;
					
			var mcb = player.MotherClubBonus;
			if(mcb === undefined)
				mcb  = player.motherClubBonus;
				
			if (mcb === undefined || halfEffect){
				if (loyalty !== undefined){
					//formula
					// loyalty = 1 + sqrt(days/336)*19
					// bonus = sqrt(days/336)
					// -> bonus = (loyalty - 1) / 19
					var skillUp = ( loyalty - 1 ) / 19.0;
					
					//FIXME: Delete next season
					if(halfEffect)
						skillUp *= 0.5;

					if(mcb == "True" || Foxtrick.Pages.Players.isOwnPlayersPage(doc) && mcb !== undefined)
						skillUp += 0.25;
					//FIXME: end
					
					var appendix;
					//find correct style for this loyalty level
					if(skillUp == 1)
						appendix = "1000";
					else if(skillUp >= 0.875)
						appendix = "875";
					else if(skillUp >= 0.75)
						appendix = "750";
					else if(skillUp >= 0.625)
						appendix = "625";
					else if(skillUp >= 0.50)
						appendix = "500";
					else if(skillUp >= 0.375)
						appendix = "375";
					else if(skillUp >= 0.25)
						appendix = "250";
					else if(skillUp >= 0.125)
						appendix = "125";
					else 
						return;

					//bars is updated on the fly when removing class "percentageImage", so iterate like this
					while(bars.length){
					//	Foxtrick.makeFeaturedElement(bars[0], this);
						bars[0].setAttribute("title", bars[0].getAttribute("title") + '\u00a0' + '+' + String(skillUp).substring(0, 4));
						bars[0].setAttribute("alt", bars[0].getAttribute("alt") + '\u00a0' + '+' + String(skillUp).substring(0, 4));
						Foxtrick.addClass(bars[0], "ft-percentImage-loyalty-" + appendix);
						Foxtrick.addClass(bars[0], "ft-percentImage");
						Foxtrick.removeClass(bars[0], "percentImage");
					}
				}
			} else {
				//replace original image by hg with 1,5 addon style
				//var bars = playerHTML.getElementsByClassName("percentImage");
				
				if(bars.length)
					while(bars.length){
						Foxtrick.makeFeaturedElement(bars[0], this);
						bars[0].setAttribute("title", bars[0].getAttribute("title") + '\u00a0' + '+' + String(skillUp).substring(0, 4));
						bars[0].setAttribute("alt", bars[0].getAttribute("alt") + '\u00a0' + '+' + String(skillUp).substring(0, 4));
						Foxtrick.addClass(bars[0], "ft-percentImage-homegrown");
						Foxtrick.addClass(bars[0], "ft-percentImage");
						Foxtrick.removeClass(bars[0], "percentImage");
					}
			}
		}
		
		if( Foxtrick.Pages.Players.isOwnPlayersPage(doc) && Foxtrick.isPage('players', doc) ){		
			var playersHTML = doc.getElementsByClassName("playerInfo");
			var players = Foxtrick.Pages.Players.getPlayerList(doc);
			for (var p=0;p<players.length;p++) {
				replacePercentageImage(players[p], playersHTML[p].getElementsByClassName("percentImage"));
			}		
		} else {
				Foxtrick.Pages.Player.getPlayer(doc, Foxtrick.Pages.Player.getId(doc), function(player){
				var bars = doc.getElementsByClassName("percentImage");
				replacePercentageImage(player, bars);
			});
		}
	}
};
