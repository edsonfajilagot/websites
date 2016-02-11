
function $get(name, inChildren) {
    if(inChildren) {
        return inChildren.querySelector(name);
    } else {
        return document.querySelector(name);
    }
}

function $all(name, inChildren) {
    if(inChildren) {
        return inChildren.querySelectorAll(name);
    } else {
        return document.querySelectorAll(name);
    }
}

function $id(name, inChildren) {
    if(inChildren) {
        return inChildren.children.namedItem(name);
    } else {
        return document.getElementById(name);
    }
}

function $class(name) {
    return document.getElementsByClassName(name);
}

function $name(name) {
    return document.getElementsByTagName(name);
}

function $filter(nodes, fn) {
    return Array.prototype.filter.call(nodes, fn);
}


function $each(arr, cb) {
    if(arr == null) {
        return;
    } else if (Array.prototype.forEach && arr.forEach === Array.prototype.forEach) {
        arr.forEach(cb);
    } else {
        for(var i = 0; i < arr.length; i++) {
            (function() {
                cb(arr[i], i, arr);
            })();
        }
    }
}

function $next(node) {
    return node.nextElementSibling;
}

function $previous(node) {
    return node.previousElementSibling;
}

function $siblings(node) {
    return $filter(node.parentNode.children, function (child) { return child !== node; });
}

function $style() {
    $each(arguments, function(val) {
        if(val[0].length != null) {
            $each(val[0], function(element) {
                element.className = val[1];
            });
        } else {
            val[0].className = val[1];
        }
    });
}

function $toggle(node, className) {
  node.classList.toggle(className);
}

function $new(tag, id, html) {
    var new_tag = document.createElement(tag);
    new_tag.id = id;
    new_tag.innerHTML = html;
    return new_tag;
}

function $after(node, html) {
    node.insertAdjacentHTML('afterend', html);
}

function $before(node, html) {
    node.insertAdjacentHTML('beforebegin', html);
}

function $append(parent, child) {
    parent.appendChild(child);
}

function $prepend(parent, node) {
    parent.insertBefore(node, parent.firstChild);
}

function $remove(parent, child) {
    parent.removeChild(child);
}

function $clone(node) {
    return node.cloneNode(true);
}

function $contains(node, child) {
    return node !== child && node.contains(child);
}

function $has(node, selector) {
    return node.querySelector(selector) !== null;
}

function $empty(node) {
    return node.innerHTML == '';
}

function $style_of(node, ruleName) {
    return getComputedStyle(node)[ruleName]
}

function $attribute_of(node, name) {
    return node.getAttribute(name);
}

function $attribute(node, name, value) {
    return node.setAttribute(name, value);
}

function $html_of(node) {
    return node.innerHTML;
}

function $html(node, newhtml) {
    node.innerHTML = newhtml;
}

function $has_class(node, className) {
  return node.classList.contains(className);
}


function $outer_html(node) {
    return node.outerHTML;
}

function $replace_with(node, newhtml) {
    node.outerHTML = newhtml;
}

function $matches(node, selector) {
    if(node.matches) {
        return node.matches(selector);
    } else if(node.matchesSelector) {
        return node.matchesSelector(selector);
    } else if(node.mozMatchesSelector) {
        return node.mozMatchesSelector(selector);
    } else if(node.webkitMatchesSelector) {
        return node.webkitMatchesSelector(selector);
    } else if(node.oMatchesSelector) {
        return node.oMatchesSelector(selector);
    } else if(node.msMatchesSelector) {
        return node.msMatchesSelector(selector);
    } else {
        return null;
    }
}

function $offset(node) {
    return {left: node.offsetLeft, top: node.offsetTop};
}

function $offset_parent(node) {
    return node.offsetParent || node;
}

function $parent(node) {
    return node.parentNode;
}

function $text_of(node) {
    return node.textContent;
}

function $text(node, newtext) {
    node.textContent = newtext;
}

function $boot(cb) {
    document.addEventListener("DOMContentLoaded", cb);
}

function $off(node, eventName,  eventHandler) {
    node.removeEventListener(eventName, eventHandler);
}

function $on(node, eventName, eventHandler) {
    node.addEventListener(eventName, eventHandler);
}

function $http(settings) {
    var req = new XMLHttpRequest();
    req.withCredentials = settings.credentials;

    req.onreadystatechange = function(){
        if(req.readyState == 4) {
            if (req.status == 200){
                settings.good(req);
            } else {
                settings.error(req);
            }
        }
    }
    req.open(settings.method, settings.url, true);
    req.send(null);
}

function $now() {
    return Date.now();
}

function $parse(htmlString) {
    var tmp = document.implementation.createHTMLDocument()
    tmp.body.innerHTML = htmlString
    return tmp.body.children;
}

function $json(jsonString) {
    return JSON.parse(jsonString);
}


function kill_videos() {
    // need to dispose of the vjs player and make the new one
    // just to avoid a stupid as fuck bug in flash players
    // being hidden
    $each($class('video-js'), function(player) {
        var parent = player.parentNode;
        var player_id = player.id;

        _V_(player_id).dispose();

        parent.innerHTML = document.videoHTMLS[player_id];

        if(parent.classList.contains('active')) {
            var player = _V_(player_id);
        }
    });
}

function video_tabs() {
    $each($class('tabs'), function(tabs) {
        var panels = $class('content');

        $each(tabs.children, function(thetab, index) {
            var thepanel = panels[index];

            thetab.onclick = function () {
                $style(
                    [$siblings(thetab), ''],
                    [thetab, 'active'],
                    [$siblings(thepanel), 'content'],
                    [thepanel, 'content active']
                );

                kill_videos();
            }
        });
    });
}

function videos() {
    document.videoHTMLS = {};

    var video = $class('video-js');

    if(video && video.length > 1) {
        // need to keep the stupid HTML for videos around to work
        // around a dumb flash+videojs bug.
        $each(video, function(player) {
            document.videoHTMLS[player.id] = player.parentNode.innerHTML;
            if(player.parentNode.classList.contains('active')) {
                var player = _V_(player.id);
            }
        });

        video_tabs();
    } else if(video && video.length == 1) {
        var player = _V_(video[0]);
    }
}



function paydiv() {
    var list = $id('paydiv');

    $http({
            'url': 'https://paydiv.io/access/paid/' + list.dataset.paydiv_product + '/',
            'method': "GET",
            'good': function (req) {
                list.innerHTML = req.responseText;
                videos();

                if(paydiv.ongood) {
                    paydiv.purchase_state = req.getResponseHeader('X-Paydiv-Paid');
                    paydiv.purchased = paydiv.purchase_state == 'FREE' || paydiv.purchase_state == 'PAID';
                    paydiv.content_state = req.getResponseHeader('X-Paydiv-Content-Available');
                    paydiv.has_content = paydiv.content_state == 'AVAILABLE'
                    paydiv.ongood(paydiv.purchased, paydiv.has_content);
                }
            },
            'credentials': true,
            'error': function (req) {
                list.innerHTML = "<p>Content currently unavailable. Please try again later.</p>";
                if(paydiv.onerror) paydiv.onerror(req);
            }
        });
}



