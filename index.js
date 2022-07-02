
var defaultEntries = [
    

        {"title":"Abha foods        ",
        "link":"+91 9643811579",
        "desc":"C1 Sri om apts, Ghaziabad, Uttar Pradesh, 201005",
        "indexed":"Ghaziabad, Uttar Pradesh, 201005"},
        
        {"title":"Satkar Charitable Trust ",
        "link":"+91 9044498200",
        "desc":"Sector J , Kanpur Road Aashiaana , Lucknow, Uttar Pradesh, 226010        ",
        "indexed":"Lucknow, Uttar Pradesh, 226010        "},

        {"title":"Manseva",
        "link":"+91 9999661600",
        "desc":" Manseva Charitable, Ghaziabad, Uttar Pradesh, 201005        ",
        "indexed":"Ghaziabad, Uttar Pradesh, 201005"},

        {"title":"Humanity Matters",
        "link":"+91 9643811579",
        "desc":"119/619, Pandu Nagar, Opposite shyam enclave apartment, Kanpur, Uttar Pradesh, 208002        ",
        "indexed":"Kanpur, Uttar Pradesh, 208002        "},
        {"title":"CoDietFood    ",
        "link":"+91 9538009610",
        "desc":"Suraj Kund Road, Meerut, Uttar Pradesh, 250001",
        "indexed":"Meerut, Uttar Pradesh, 250001"},
        {"title":"  Brinda - Ready to Serve Tiffin",
        "link":"  7285881919, 9824481241 ",
        "desc":"    Vasna, Paldi, Dharnidhar, Anjali, Manekbaug, Nehrumagar, Shivranjni, Jodhpur, Shyamal, Ahmedabad   ",
        "indexed":"      Ahmedabad, Gujarat  "},
        {"title":" Amitabhojanam ",
        "link":" 9345517634 ",
        "desc":"  All Over Chennai    ",
        "indexed":"    Chennai    "},
        {"title":" Hideout ",
        "link":"  7554920313",
        "desc":"    Bhopal, Madhya Pradesh   ",
        "indexed":"     Bhopal, Madhya Pradesh   "},
        {"title":" Anand Sanghi (Begum Bazar) ",
        "link":" 9247756006 ",
        "desc":" Hyderabad - Sec'bad      ",
        "indexed":"  Hyderabad      "},
        {"title":" Food for positive people(Sindhi seva samiti) ",
        "link":"9845004509  ",
        "desc":"     Kumarapark,Sadashivnagar,Hebbal,Shanthinagar and Frazer town",
        "indexed":"   bangalore      "},
        {"title":" Jain Dosti Federation [In association with   iSAHAYOG(NGO)]  (only for covid affected and  their family)   ",
        "link":" 9449695708 ",
        "desc":"      Wilson Garden, Bengaluru, Karnataka ",
        "indexed":"   Bengaluru, Karnataka     "},
        {"title":" Vasavi Yuvajana Sangha (only for those in isolation and quarantine at home) ",
        "link":" 9886485777 ",
        "desc":"    Basavanagudi. Indira Nagar. Jayanagar. Koramangala. Malleshwaram. Rajaji Nagar. Frazer Town. Sadashivanagar.   ",
        "indexed":"    Basavanagudi. Indira Nagar. Jayanagar. Koramangala. Malleshwaram. Rajaji Nagar. Frazer Town. Sadashivanagar. Bangalore    "},
        {"title":"ChowKitchen",
        "link":"+91 9650190017",
        "desc":"New Delhi, Delhi NCR, 110029        ",
        "indexed":"Delhi NCR, 110029"},];

var entries = JSON.parse(localStorage.getItem('entries')) || defaultEntries;
var pastSearches = JSON.parse(localStorage.getItem('pastSearches')) || [];
var knownWords = JSON.parse(localStorage.getItem('knownWords')) || ['delhi', 'new', 'is', 'meerut', 'lucknow', 'delhi', 'kanpur'];
var trie = createTrie(entries, 'indexed');

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function renderResults(results, query) {
    var queryWords = query.toLowerCase().split(' ').filter(function(e){return e});
    $('#mainContent').html('');

    results.forEach(result => {

        var resultTitle = result.title;
        var resultDesc = result.desc;

        for (const qWordIndex in queryWords) {
            var qWord = queryWords[qWordIndex];
            var qWordRegex = new RegExp("(^|[^a-zA-Z0-9])(" + qWord + ")", "gi");

            resultTitle = resultTitle.replaceAll(qWordRegex, '$1<span class="match">$2</span>');
            resultDesc = resultDesc.replaceAll(qWordRegex, '$1<span class="match">$2</span>');
        }

        var resultHtml = `<div class="searchResult">
            <h3><a href="${result.link}">${resultTitle}</a></h3>
            <a href="${result.link}" class="searchLink">${result.link}</a><br/>
            <p>${resultDesc}</p>
            <div class="hrLine"></div>
        </div>`
        $('#mainContent').append(resultHtml);
    });
    return false;
}

function renderEntries(entries) {
    entries.forEach(entry => {
        var entryHtml = `<div class="entry">
            <table class="table borderless table-responsive table-condensed">
                <tbody>
                    <tr><th>Title</th><td>${entry.title}</td></tr>
                    <tr><th>Link</th><td>${entry.link}</td></tr>
                    <tr><th>Desc</th><td>${entry.desc}</td></tr>
                </tbody>
            </table>
        </div>`
        $('#entryList').append(entryHtml);
    });
    return false;
}

function renderSearchSuggestions(suggestions) {
    var suggestionHtmlList = [];
    suggestions.forEach(suggestion => {
        var suggestionHtml = `<button class="suggestion" onClick="myFunc(this);">${suggestion}</button>`
        suggestionHtmlList.push(suggestionHtml);
    });
    var suggestionsHtml = '';
    if (suggestionHtmlList.length > 0 ) {
        suggestionsHtml = `<div class="searchSuggestionSeparator"></div><div id="searchSuggestions">${suggestionHtmlList.join('')}</div>`;
    }
    $('#searchList').html(suggestionsHtml);
    return false;
}

function renderFoundSuggestions() {
    query = $('#searchBox').val();

    if (query.length > 2) {
        var suggestions = trie.getMatches(query, { limit: 12});
        var queryRegex = new RegExp("^(" + query + ")|([ ]" + query + ")", "i");
        var suggestionList = [query];
        suggestions.forEach(suggestion => {
            suggestionList.push(suggestion.indexed.slice(queryRegex.exec(suggestion.indexed).index));
        });
        suggestionList = suggestionList.filter(onlyUnique).slice(0, 6);
        renderSearchSuggestions(suggestionList);
    }
    else if (query.length > 0) {
        renderSearchSuggestions([query]);
    }
    else {
        renderSearchSuggestions(pastSearches);
    }
    return false;
}


function searchEntries() {
    hideSearchList();
    query = $('#searchBox').val();
    if(query) {
        pastSearches.unshift(query);
        localStorage.setItem('pastSearches', JSON.stringify(pastSearches));
    }
    else {
        return false;
    }

    var searchResults = trie.getMatches(query);
    renderResults(searchResults, query);


    if (searchResults.length == 0) {
        var queryWords = query.toLowerCase().replace(/[^\w\s]/gi, ' ').trim().split(' ').filter(function(e){return e});
        var correctedQueryWords = [];
        for (const qWordIndex in queryWords) {
            var qWord = queryWords[qWordIndex];
            var minDistance = 999;
            var minWord = null;
            for (const wordIndex in knownWords) {
                var knownWord = knownWords[wordIndex];
                var distance = levenshtein(qWord, knownWord);
                if (distance <= 1) {
                    minDistance = distance;
                    minWord = knownWord;
                    break;
                }
                else {
                    if (minDistance > distance || (minDistance == distance && (qWord[0] === knownWord[0] || qWord.length === knownWord.length))) {
                        minDistance = distance;
                        minWord = knownWord;
                    }
                }
            }
            if (minWord !== null && minDistance <=2) {
                correctedQueryWords.push(minWord);
            }
        }

        if (queryWords.length !== correctedQueryWords.length) {
            $('#contentMeta').html(`No results for search "${query}"`);
        }
        else {
            $('#contentMeta').html(`Did you mean <span style="cursor: pointer; color: #337ab7;" onClick="myFunc(this);">${correctedQueryWords.join(' ')}</span>?`);
        }
    }
    else {
        $('#contentMeta').html(`Showing Results for "${query}"`);
    }
    return false;
}

function hideSearchList() {
    $('#searchList').attr('class', '');
}

function showSearchList(event) {
    event.stopPropagation();
    $('#searchList').addClass('displayBlock');
}

function myFunc(elem) {
    var selectedSuggestion = $(elem).text();
    $('#searchBox').val(selectedSuggestion);
    searchEntries();
    return false;
}

$(document).ready(function(){
    $('#contentEntryForm').children( "form" ).submit(event => {
        var newEntry = {
            "title": $('#entryTitle').val(),
            "link": $('#entryLink').val(),
            "desc": $('#entryDescription').val(),
            "indexed": (`${$('#entryTitle').val()} ${$('#entryDescription').val()}`).replace(/[^\w\s]/gi, ' ').trim()
        };
        entries.push(newEntry);
        var newWords = newEntry.indexed.toLowerCase().split(' ');
        newWords = newWords.filter(onlyUnique);
        var index = newWords.indexOf('');
        if (index > -1) {
            newWords.splice(index, 1);
        }
        for (const wordIndex in newWords) {
            var word = newWords[wordIndex].toLowerCase();
            if (word.length > 1) {
                if (knownWords.indexOf(word) == -1) {
                    knownWords.unshift(word);
                }
            }
        }
        localStorage.setItem('entries', JSON.stringify(entries));
        localStorage.setItem('knownWords', JSON.stringify(knownWords));
        trie = createTrie(entries, 'indexed');
        renderEntries(entries);
        $('#contentEntryForm').children( "form" )[0].reset();
    });
    $('#searchBox').on('input', renderFoundSuggestions);
    $('#searchForm').submit(searchEntries);
    $('#searchBox').click(showSearchList);
    $(document).on('click', function(){
        hideSearchList();
    });
    renderEntries(entries);
});
