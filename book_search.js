/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */


    let resArr = []; //array to hold search results

    for(const book of scannedTextObj)
    {   
        //this code deals with hyphenated words
        //this indicates whether or not the current line STARTS with a hyphenated word
        let hyphen = 0; 
        //this holds the part of the hyphenated word that was on the LAST line
        let lastword;
        //this holds the last used line number
        let lastline;
        //this holds the last used page
        let lastpage;
        for (const quote of book.Content)
        {
            let words = quote.Text;

            //this is for when the lines aren't consecutive
            //it will also account for lines that are hyphenated across pages
            if  (lastpage == quote.Page)
            {
                if (lastline != quote.Line -1)
                {
                    hyphen = 0
                }
            }
            else if (lastpage == quote.Page - 1)
            {
                if (quote.Line != 1)
                {
                    hyphen = 0
                }
            }
            else
            {
                hyphen = 0
            }

            //appends hyphenated word onto current line
            if (hyphen == 1)
            {
                words = lastword+words;
            }

            let pos = words.search(searchTerm);
            //fixes line number if quoted line is hyphenated
            quoteline = quote.Line
            if (pos == 0 && hyphen == 1)
            {
                quoteline = lastline
            }

            //pushes a found term onto the results array
            if (pos > -1)
            {
                let item = {
                    "ISBN": book.ISBN,
                    "Page": quote.Page,
                    "Line": quoteline
                }
                resArr.push(item);
            }

            //checks if current line ends with hyphenated word.
            //sets next line up to properly fix it.
            let hycheck = words.charAt(words.length - 1);
            if (hycheck == '-')
            {
                hyphen = 1;
                let lastspace = words.lastIndexOf(" ");
                lastword = words.slice(lastspace+1, words.length-1);

            }
            else
            {
                hyphen = 0
            }

            lastline = quote.Line;
            lastpage = quote.Page;

        }
        
    }

    var result = {
        "SearchTerm": searchTerm,
        "Results": resArr
    };
    
    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]

//**slightly more complicated output object */
const fakeBooks = [
    {
        "Title": "Book One",
        "ISBN": "0000000000001",
        "Content": [
            {
                "Page": 3,
                "Line": 60,
                "Text": "hyphenation test line. Begin test-"
            },
            {
                "Page": 4,
                "Line": 1,
                "Text": "ing of the feature"
            }
        ] 
    },
    {
        "Title": "Book Two",
        "ISBN": "0000000000002",
        "Content": [
            {
                "Page": 50,
                "Line": 17,
                "Text": "This line tests if multiple books work properly."
            },
            {
                "Page": 10,
                "Line": 17,
                "Text": "now we have to check for nonconsecutive entries. For ex-"
            },
            {
                "Page": 20,
                "Line": 18,
                "Text": "ample, the last two entries ARE NOT on consecutive pages."
            },
        ] 
    }

]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

//** additional testing output object */
/** Example output object */
const fakeTest1 = {
    "SearchTerm": "line",
    "Results": [
        {
            "ISBN": "0000000000001",
            "Page": 3,
            "Line": 60
        },
        {
            "ISBN": "0000000000002",
            "Page": 50,
            "Line": 17
        },
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/** This tests for case-sensitivity */
const test3result = findSearchTermInBooks("Asked", twentyLeaguesIn); 
if (test3result.Results.length == 0) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", 0);
    console.log("Received:", test3result.Results.length);
}
/** This tests for null result */
const test4result = findSearchTermInBooks("cheese", twentyLeaguesIn); 
if (test4result.Results.length == 0) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", 0);
    console.log("Received:", test4result.Results.length);
}

/** This tests for proper hyphen handling - basic */
const test5result = findSearchTermInBooks("darkness", twentyLeaguesIn); 
if (test5result.Results.length == 1) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", 1);
    console.log("Received:", test5result.Results.length);
}

/** This tests for handling multiple books properly */
const test6result = findSearchTermInBooks("line", fakeBooks);
if (JSON.stringify(fakeTest1) === JSON.stringify(test6result)) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", fakeTest1);
    console.log("Received:", test6result);
}

/** This tests for proper hyphen handling - advanced */
const test7result = findSearchTermInBooks("testing", fakeBooks); 
if (test7result.Results.length == 1) {
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", 1);
    console.log("Received:", test7result.Results.length);
}

/** This tests for proper hyphen handling - advanced failure */
const test8result = findSearchTermInBooks("example", fakeBooks); 
if (test8result.Results.length == 0) {
    console.log("PASS: Test 8");
} else {
    console.log("FAIL: Test 8");
    console.log("Expected:", 0);
    console.log("Received:", test8result.Results.length);
}
