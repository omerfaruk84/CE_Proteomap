function guncelle(){

	chrome.tabs.executeScript(null,{file: 'mycontent.js'});

chrome.tabs.getSelected(null, function(tab) {			
chrome.tabs.sendRequest(tab.id, {action : 'getSource'}, 
function(source) {

  //datax=source.removeStopWords();
//alert(datax);

//alert(datax.length);
});

});
    	//div#0 translatorun yazdigi yer. eger doluysa orayi temizliyoruz
	document.getElementById('0').textContent='';
	chrome.browserAction.setIcon({path: "images/icon1.png"});
	chrome.browserAction.setBadgeBackgroundColor({color:[190, 190, 190, 230]});
	chrome.browserAction.setBadgeText({text:"x"});	
	chrome.browserAction.setTitle({"title": "Not translatable!"});
	//acik sitenin urlsi aliniyor, urlReg'den hangi translatorun
	//kullanilacagina karar verilip sayfaya o translator yukleniyor
	chrome.tabs.getSelected(null, function(tab) {
		var i,url=tab.url;
		document.getElementById('hata').textContent='{"error": {"translator": "untranslated", "adres": \"' + url + '", "duzeltildi": "false\"}}';
		document.getElementById('varUrl').textContent=url;
		for(i=0;i<urlReg.length;i++){
			if (url.match(urlReg[i][0])){ 
				chrome.browserAction.setIcon({path: "images/icon2.png"});
				chrome.browserAction.setBadgeBackgroundColor({color:[180, 50, 20, 230]});
				chrome.browserAction.setBadgeText({text:"+"});
				chrome.browserAction.setTitle({"title": "Translator: " + urlReg[i][1]});
				document.getElementById('hata').textContent='{"error": {"translator": \"' + urlReg[i][1] + '", "adres": "' + url + '\", "duzeltildi": "false"}}';
				loadTranslator(urlReg[i][1],urlReg[i][2]);
				break
			}
		}
	});
}

function loadTranslator(translatorAdi,bool){
	if (bool) {
		if (x=document.getElementById('translator')) 
			x.parentNode.removeChild(x);
		var translator=document.createElement('script');
		translator.id='translator';
		translator.type = 'text/javascript';
		translator.src='translators/' + translatorAdi + '.js?r=' +(new Date()).getTime();
		document.head.appendChild(translator)	
	}
	else{
		chrome.tabs.executeScript(null,{file: 'translators/' + translatorAdi+ '.js'});
	}

}        


/*
 * String method to remove stop words
 * Written by GeekLad http://geeklad.com
 * Stop words obtained from http://www.lextek.com/manuals/onix/stopwords1.html
 *   Usage: string_variable.removeStopWords();
 *   Output: The original String with stop words removed
 */
 
 

 
 
 
String.prototype.removeStopWords = function() {
	var x;
	var y;
	var word;
	var stop_word;
	var regex_str;
	var regex;
	var cleansed_string = this.valueOf();
	//cleansed_string =cleansed_string.removeSmallStopWords();
	//cleansed_string.replace(/[\.,-\/#!$%\^&\*@;:{}=\-_`~;()]/g, ""); 
	
    cleansed_string = cleansed_string.replace(/([-.,()&/$#!\[\]{}"*']+\B|\B[-.,()&$#!\[\]{}"'])/g, " ");

	//8 jkarakterden uzun olanlar gene ismi degildir...
	cleansed_string =cleansed_string.replace(/\S{8,}/ig, " ");
	//2 karakterden kisa olanlar gen ismi degildir
	cleansed_string =cleansed_string.replace(/^\s*\S{1}\s*/ig, " ");
	//Sadece rakamsa gen degildir
	cleansed_string =cleansed_string.replace(/\b(\d+)\b/ig, " ");
	//Ilk harfi buyuk sonraki 3 harfi kucukse %99 ozel isimdir
	cleansed_string =cleansed_string.replace(/([A-Z]{1}[a-z]{3,})/ig, " ");
	//Tek harflileri temizle
	cleansed_string =cleansed_string.replace(/\b.{1}\b/ig, " ");
	
	cleansed_string =cleansed_string.replace(/\b[a-z]+\b/g, " ");
	cleansed_string =cleansed_string.replace(/^\s*\S{1,2}\s*/ig, " ");
	    cleansed_string.replace(/\s{2,}/g," ");
	var stop_words = new Array(
'about',
'strength'


	)
// claen string from . ( ) and other stuff


// Split out all the individual words in the phrase
//words = cleansed_string.match(/[^\s]+|\s+[^\s+]$/g);

//
	// Review all the words
	//for(x=0; x < words.length; x++) {
		// For each word, check all the stop words
		for(y=0; y < stop_words.length; y++) {
			// Get the current word
			//word = words[x].replace(/\s+|[^a-z]+/ig, "");	// Trim the word and remove non-alpha

			// Get the stop word
			stop_word = stop_words[y];

			// If the word matches the stop word, remove it from the keywords
			//if(word.toLowerCase() == stop_word) {
				// Build the regex
				//regex_str = "^\\s*"+stop_word+"\\s*$";		// Only word
				//regex_str += "|^\\s*"+stop_word+"\\s+";		// First word
				//regex_str += "|\\s+"+stop_word+"\\s*$";		// Last word
				//regex_str += "|\\s+"+stop_word+"\\s+";		// Word somewhere in the middle
				//regex_str += "|\\S+"+stop_word+"\\s+";		// Word somewhere in the middle
				//regex_str += "|\\s+"+stop_word+"\\S+";		// Word somewhere in the middle
				regex_str = '\\S*'+stop_word+'\\S*';		// Word somewhere in the middle
			
				//regex_str += "|\\^.*"+stop_word+"\\.*";		// Word somewhere in the middle
				regex = new RegExp(regex_str, 'gi');
			    //regexy= "/^[a-zA-Z]*" + stop_word + "[a-zA-Z]*/ig";
				//cleansed_string = cleansed_string.replace(regexy,"");
			
				
				
			
				//cleansed_string = cleansed_string.replace(regex, "");
				
			//}
		}
	//}

cleansed_string = cleansed_string.replace(/\s{2,}/g," ");
words = cleansed_string.match(/[^\s]+|\s+[^\s+]$/g);
words2=eliminateDuplicates(words);
//alert(words2);
//alert("Words" + words.length + " Words2:" + words2.length);
	return cleansed_string.replace(/^\s+|\s+$/g, "");
}


////////////////////
String.prototype.removeSmallStopWords = function() {
	var x;
	var y;
	var word;
	var stop_word;
	var regex_str;
	var regex;
	var cleansed_string = this.valueOf();
	var stop_words = new Array(
		'a',
		'about',
		'above',
		'across',
		'after',
		'again',
		'against',
		'all',
		'almost',
		'alone',
		'along',
		'already',
		'also',
		'although',
		'always',
		'among',
		'an',
		'and',
		'another',
		'any',
		'anybody',
		'anyone',
		'anything',
		'anywhere',
		'are',
		'area',
		'areas',
		'around',
		'as',
		'ask',
		'asked',
		'asking',
		'asks',
		'at',
		'away',
		'b',
		'back',
		'backed',
		'backing',
		'backs',
		'be',
		'became',
		'because',
		'become',
		'becomes',
		'been',
		'before',
		'began',
		'behind',
		'being',
		'beings',
		'best',
		'better',
		'between',
		'big',
		'both',
		'but',
		'by',
		'c',
		'came',
		'can',
		'cannot',
		'case',
		'cases',
		'certain',
		'certainly',
		'clear',
		'clearly',
		'come',
		'could',
		'd',
		'did',
		'differ',
		'different',
		'differently',
		'do',
		'does',
		'done',
		'down',
		'down',
		'downed',
		'downing',
		'downs',
		'during',
		'e',
		'each',
		'early',
		'either',
		'end',
		'ended',
		'ending',
		'ends',
		'enough',
		'even',
		'evenly',
		'ever',
		'every',
		'everybody',
		'everyone',
		'everything',
		'everywhere',
		'f',
		'face',
		'faces',
		'fact',
		'facts',
		'far',
		'felt',
		'few',
		'find',
		'finds',
		'first',
		'for',
		'four',
		'from',
		'full',
		'fully',
		'further',
		'furthered',
		'furthering',
		'furthers',
		'g',
		'gave',
		'general',
		'generally',
		'get',
		'gets',
		'give',
		'given',
		'gives',
		'go',
		'going',
		'good',
		'goods',
		'got',
		'great',
		'greater',
		'greatest',
		'group',
		'grouped',
		'grouping',
		'groups',
		'h',
		'had',
		'has',
		'have',
		'having',
		'he',
		'her',
		'here',
		'herself',
		'high',
		'high',
		'high',
		'higher',
		'highest',
		'him',
		'himself',
		'his',
		'how',
		'however',
		'i',
		'if',
		'important',
		'in',
		'interest',
		'interested',
		'interesting',
		'interests',
		'into',
		'is',
		'it',
		'its',
		'itself',
		'j',
		'just',
		'k',
		'keep',
		'keeps',
		'kind',
		'knew',
		'know',
		'known',
		'knows',
		'l',
		'large',
		'largely',
		'last',
		'later',
		'latest',
		'least',
		'less',
		'let',
		'lets',
		'like',
		'likely',
		'long',
		'longer',
		'longest',
		'm',
		'made',
		'make',
		'making',
		'man',
		'many',
		'may',
		'me',
		'member',
		'members',
		'men',
		'might',
		'more',
		'most',
		'mostly',
		'mr',
		'mrs',
		'much',
		'must',
		'my',
		'myself',
		'n',
		'necessary',
		'need',
		'needed',
		'needing',
		'needs',
		'never',
		'new',
		'new',
		'newer',
		'newest',
		'next',
		'no',
		'nobody',
		'non',
		'noone',
		'not',
		'nothing',
		'now',
		'nowhere',
		'number',
		'numbers',
		'o',
		'of',
		'off',
		'often',
		'old',
		'older',
		'oldest',
		'on',
		'once',
		'one',
		'only',
		'open',
		'opened',
		'opening',
		'opens',
		'or',
		'order',
		'ordered',
		'ordering',
		'orders',
		'other',
		'others',
		'our',
		'out',
		'over',
		'p',
		'part',
		'parted',
		'parting',
		'parts',
		'per',
		'perhaps',
		'place',
		'places',
		'point',
		'pointed',
		'pointing',
		'points',
		'possible',
		'present',
		'presented',
		'presenting',
		'presents',
		'problem',
		'problems',
		'put',
		'puts',
		'q',
		'quite',
		'r',
		'rather',
		'really',
		'right',
		'right',
		'room',
		'rooms',
		's',
		'said',
		'same',
		'saw',
		'say',
		'says',
		'second',
		'seconds',
		'see',
		'seem',
		'seemed',
		'seeming',
		'seems',
		'sees',
		'several',
		'shall',
		'she',
		'should',
		'show',
		'showed',
		'showing',
		'shows',
		'side',
		'sides',
		'since',
		'small',
		'smaller',
		'smallest',
		'so',
		'some',
		'somebody',
		'someone',
		'something',
		'somewhere',
		'state',
		'states',
		'still',
		'still',
		'such',
		'sure',
		't',
		'take',
		'taken',
		'than',
		'that',
		'the',
		'their',
		'them',
		'then',
		'there',
		'therefore',
		'these',
		'they',
		'thing',
		'things',
		'think',
		'thinks',
		'this',
		'those',
		'though',
		'thought',
		'thoughts',
		'three',
		'through',
		'thus',
		'to',
		'today',
		'together',
		'too',
		'took',
		'toward',
		'turn',
		'turned',
		'turning',
		'turns',
		'two',
		'u',
		'under',
		'until',
		'up',
		'upon',
		'us',
		'use',
		'used',
		'uses',
		'v',
		'very',
		'w',
		'want',
		'wanted',
		'wanting',
		'wants',
		'was',
		'way',
		'ways',
		'we',
		'well',
		'wells',
		'went',
		'were',
		'what',
		'when',
		'where',
		'whether',
		'which',
		'while',
		'who',
		'whole',
		'whose',
		'why',
		'will',
		'with',
		'within',
		'without',
		'work',
		'worked',
		'working',
		'works',
		'would',
		'x',
		'y',
		'year',
		'years',
		'yet',
		'you',
		'young',
		'younger',
		'youngest',
		'your',
		'yours',
		'z'
	)

	// Split out all the individual words in the phrase
	words = cleansed_string.match(/[^\s]+|\s+[^\s+]$/g);

	// Review all the words
	for(x=0; x < words.length; x++) {
		// For each word, check all the stop words
		for(y=0; y < stop_words.length; y++) {
			// Get the current word
			word = words[x].replace(/\s+|[^a-z]+/ig, "");	// Trim the word and remove non-alpha

			// Get the stop word
			stop_word = stop_words[y];

			// If the word matches the stop word, remove it from the keywords
			if(word.toLowerCase() == stop_word) {
				// Build the regex
				regex_str = "^\\s*"+stop_word+"\\s*$";		// Only word
				regex_str += "|^\\s*"+stop_word+"\\s+";		// First word
				regex_str += "|\\s+"+stop_word+"\\s*$";		// Last word
				regex_str += "|\\s+"+stop_word+"\\s+";		// Word somewhere in the middle
				regex = new RegExp(regex_str, "ig");

				// Remove the word from the keywords
				cleansed_string = cleansed_string.replace(regex, " ");
			}
		}
	}
	return cleansed_string.replace(/^\s+|\s+$/g, "");
}

function eliminateDuplicates(arr) {
var i,
  len=arr.length,
  out=[],
  obj={};

 for (i=0;i<len;i++) {
 obj[arr[i]]=0;
 }
 for (i in obj) {
 out.push(i);
 }
 return out;
}