// URI comparation
function checkURIs(uri1, uri2) {
  // decode input
  uri1 = decodeURIComponent(uri1);
  uri2 = decodeURIComponent(uri2);

  var uri1Params = simplifyPath(uri1).split('/');
  var uri2Params = simplifyPath(uri2).split('/');

  // early termination
  if (uri1Params.length !== uri2Params.length) {
    return false;
  }

  var uriParamsLength = uri1Params.length;
  if (uriParamsLength < 3) {
    return false;
  }

  // check scheme, this is case insensitive
  if (uri1Params[0].toLowerCase() !== uri2Params[0].toLowerCase()) {
    return false;
  }

  // check host, host is case insensitive but auth URI is case sensitive
  var host1 = uri1Params[2];
  var host2 = uri2Params[2];
  if (!checkHost(host1, host2)) {
    return false;
  }

  // if there is only hostname
  if (uriParamsLength === 3) {
    return true;
  }

  // compare path, uriParamsLength > 3
  for (var i = 3; i < uri1Params.length - 1; i++) {
    if (uri1Params[i] !== uri2Params[i]) {
      return false;
    }
  }

  // check last path
  // last path may contain query string
  var lastPath1Arr = uri1Params[uriParamsLength - 1].split('?');
  var lastPath2Arr = uri2Params[uriParamsLength - 1].split('?');

  if (lastPath1Arr.length !== lastPath2Arr.length || lastPath1Arr[0] !== lastPath2Arr[0]) {
    return false;
  }

  // check query string
  if (lastPath1Arr.length > 1) {
    return checkQuery(lastPath1Arr[1], lastPath2Arr[1]);
  }
  
  // pass all check
  return true;
}

// simplify uri path
/*
 * @param uri: string
 */
function simplifyPath(uri) {
  // get from host name after wards
  var index = getKthOccurrence(uri, '/', 3);
  var subUri = uri.substring(index);

  var oneDirUp = /[^\/]*\/\.\.\//;
  var sameDir = /\.\//g;

  while (oneDirUp.test(subUri)) {
    subUri = subUri.replace(oneDirUp, '');
  }

  subUri = subUri.replace(sameDir, '');
  return uri.substring(0, index) + subUri;

}

function getKthOccurrence(string, character, k) {
  for (var i = 0; i < string.length; i++) {
    if (string[i] === character) {
      k--;
    }

    if (k === 0) {
      return i;
    }
  }

  return -1;
} 

// check if 2 hosts are the same
function checkHost(host1, host2) {
  var host1Params = host1.split('@');
  var host2Params = host2.split('@');
  if (host1Params.length !== host2Params.length) {
    return false;
  }

  var hostName1 = host1Params[0];
  var hostName2 = host2Params[0];

  // has auth
  if (host1Params.length > 1) {
    // now hostName is Auth
    if (hostName1 !== hostName2) {
      return false;
    }

    // set hostName to actually hostname
    hostName1 = host1Params[1];
    hostName2 = host2Params[1];
  }

  // check hostname
  // add port if neccessary
  if (hostName1.indexOf(':') === -1) {
    hostName1 += ':80';
  }

  if (hostName2.indexOf(':') === -1) {
    hostName2 += ':80';
  }
  
  return hostName1.toLowerCase() === hostName2.toLowerCase();
}

function checkQuery(query1, query2) {
  var query1Params = query1.split('&');
  var query2Params = query2.split('&');

  if (query1Params.length !== query2Params.length) {
    return false;
  }

  var orderMap = {};
  var queryLength = query1Params.length;
  var isSameValue;
  var appearIndex;
  var key;
  for (var i = 0; i < queryLength; i++) {
    isSameValue = false;
    key = query1Params[i].split('=')[0];
    for (var j = 0; j < queryLength; j++) {
      if (query1Params[i] === query2Params[j]) {
        isSameValue = true;
        appearIndex = orderMap[key];
        if (appearIndex) {
          // return false if order is not correct
          if (j < appearIndex) {
            return false;
          }
        }

        orderMap[key] = j; // save order index
      }
    }

    if (!isSameValue) {
      return false;
    }
  }

  return true;
}

// test for checkURIs
var uri1;
var uri2;

uri1 = 'http://abc.com/drill/down/foo.html';
uri2 = 'http://abc.com/drill/further/test1/test2/../../../down/./foo.html';
console.log(checkURIs(uri1, uri2)); // true

uri1 = 'http://abc.com/drill/down/foo.html';
uri2 = 'http:/../abccom/drill/down/./foo.html';
console.log(checkURIs(uri1, uri2)); // false

/*uri1 = 'http://abc.com:80/~smith/home.html';
uri2 = 'http://ABC.com/%7Esmith/home.html';
console.log(checkURIs(uri1, uri2)); // true

uri1 = 'http://abc.com/drill/down/foo.html';
uri2 = 'http://abc.com/drill/further/../down/./foo.html';
console.log(checkURIs(uri1, uri2)); // true

uri1 = 'http://abc.com/foo.html?a=1&b=2';
uri2 = 'http://abc.com/foo.html?b=2&a=1';
console.log(checkURIs(uri1, uri2)); // true

uri1 = 'http://abc.com/foo.html?a=1&b=2&a=3';
uri2 = 'http://abc.com/foo.html?a=3&a=1&b=2';
console.log(checkURIs(uri1, uri2)); // false

uri1 = 'http://abc.com/foo.html?a=1&b=2&a=3';
uri2 = 'http://abc.com/foo.html?a=1&a=3&b=2';
console.log(checkURIs(uri1, uri2)); // true

uri1 = 'http://ABc.com';
uri2 = 'https://abc.com';
console.log(checkURIs(uri1, uri2)); // false

uri1 = 'http://abc.com';
uri2 = 'http://ABC.com';
console.log(checkURIs(uri1, uri2)); // true*/
