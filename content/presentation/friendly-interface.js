'use strict';
/**
 * friendly-interface
 * More friendly interface tweaks
 * @author ryanli, convincedd
 */

Foxtrick.modules['FriendlyInterface'] = {
	MODULE_CATEGORY: Foxtrick.moduleCategories.PRESENTATION,
	PAGES: ['playerDetails', 'guestbook', 'dashboard'],
	CSS: Foxtrick.InternalPath + 'resources/css/friendly-interface.css',
	OPTIONS: [
		'NtLinkForNtPlayer',
		'HideAnswerTo',
		'HideSpeechlessSecretary',
	],

	run: function(doc) {
		var module = this;
		if (Foxtrick.isPage(doc, 'playerDetails') &&
		    Foxtrick.Prefs.isModuleOptionEnabled('FriendlyInterface', 'NtLinkForNtPlayer')) {
			// show national team names as links in national players' page
			if (Foxtrick.Pages.Player.wasFired(doc))
				return;

			var playerInfo = doc.querySelector('.playerInfo');

			// a player has highlight <=> he is a national player
			var highlight = playerInfo.querySelector('.highlight');
			if (highlight) {
				var text = highlight.textContent;
				var leagueId = Foxtrick.Pages.Player.getNationalityId(doc);
				var league = Foxtrick.XMLData.League[leagueId];
				var ntId = league.NationalTeamId;
				var u20Id = league.U20TeamId;
				var ntName = Foxtrick.XMLData.getNTNameByLeagueId(leagueId);
				var u20NameRe = new RegExp(`U-20 .*${Foxtrick.strToRe(ntName)}`);

				var replace = function(team, id) {
					highlight.textContent = text.slice(0, text.indexOf(team));
					var link = Foxtrick.createFeaturedElement(doc, module, 'a');
					link.textContent = team;
					link.href = '/Club/NationalTeam/NationalTeam.aspx?teamId=' + id;
					highlight.appendChild(link);
					var suffix = doc.createTextNode(text.slice(text.indexOf(team) + team.length));
					highlight.appendChild(suffix);
				};

				// find U20 first because generally NT name is a substring of U20 name
				if (u20NameRe.test(text)) {
					let [u20Name] = u20NameRe.exec(text);
					replace(u20Name, u20Id);
				}
				else if (text.indexOf(ntName) > -1) {
					replace(ntName, ntId);
				}
			}
		}
		else if (Foxtrick.isPage(doc, 'guestbook') &&
		         Foxtrick.Prefs.isModuleOptionEnabled('FriendlyInterface', 'HideAnswerTo')) {
			var links = doc.getElementById('mainBody').getElementsByTagName('a');
			var answerToLinks = Foxtrick.filter(function(n) {
				return (n.href.search(/Guestbook\.aspx/i) >= 0);
			}, links);
			Foxtrick.map(function(n) {
				Foxtrick.addClass(n, 'hidden');
				Foxtrick.addClass(n.parentNode, 'ft-hiddenGBLinkContainer');
			}, answerToLinks);
		}
		else if (Foxtrick.isPage(doc, 'dashboard') &&
		         Foxtrick.Prefs.isModuleOptionEnabled('FriendlyInterface',
		                                              'HideSpeechlessSecretary')) {
			if (doc.getElementsByClassName('pmNextMessageCounter').length)
				return; // there are unread messages
			// nothing new, container should be marked as hidden
			var container = doc.querySelector('.pmContainer');
			Foxtrick.addClass(container, 'hidden');
		}
	}
};
