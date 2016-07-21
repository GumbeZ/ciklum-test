function msMenu() {
    var tree = document.getElementById('srv_shellHeaderNav')
    var target = false;
    var oldTarget = false;
    var flag = false;
    var resMob = false;
    var menu = document.getElementById('mobmenu');

    if ($(this).width() < 899)
        var resMob = true;
    else var resMob = false;

    function mobOpenClose() {
        if (menu.className.indexOf(' opened') > -1) {
            menu.className = menu.className.substring(0, menu.className.indexOf(" "));
            menu.style.display = '';
        } else {
            menu.className = menu.className + ' opened';
            menu.style.display = 'block';
        }
    }

    function flagDown() {
        if (flag) {
            flag.parentNode.parentNode.className = 'shell-header-dropdown-tab';
            if (flag.parentNode.nextSibling) {
                flag.parentNode.nextSibling.style.height = '';
                flag.parentNode.nextSibling.style.display = '';
            }
            flag.parentNode.parentNode.parentNode.style.height = '';
        }
    }

    function isDropown(target) {
        if (target.parentNode.parentNode.className != 'shell-header-dropdown') {
            if (oldTarget) {
                oldTarget.parentNode.nextSibling.style.display = oldTarget.parentNode.nextSibling.style.display ? '' : 'block';
                flagDown()
            }
            return false;
        } else return true;
    }
    document.onclick = function(evt) {
        var evt = evt || event;
        var target = evt.target || evt.srcElement;


        if (target.parentNode.className == 'shell-header-dropdown-label') {
            if (target == oldTarget) {
                target.parentNode.nextSibling.style.display = target.parentNode.nextSibling.style.display ? '' : 'block';
		flagDown()
            } else {
                if (isDropown(target)) {
                    if (oldTarget)
                        oldTarget.parentNode.nextSibling.style.display = '';
                    target.parentNode.nextSibling.style.display = target.parentNode.nextSibling.style.display ? '' : 'block';
		    flagDown()
                    oldTarget = target;
                }
            }
            return;

        } else {
            if (oldTarget)
                if (!tree.contains(target)) {
                    oldTarget.parentNode.nextSibling.style.display = '';
                    flagDown()
                }
            if (!menu.contains(target))
                if (menu.className.indexOf(' opened') > -1)
                    if (target.className != 'shell-header-toggle-menu' && target.className != 'shell-icon-menu') {
                        menu.className = menu.className.substring(0, menu.className.indexOf(" "));
                        menu.style.display = '';
                    }
        }
        if (target.className == 'shell-header-toggle-menu' || target.className == 'shell-icon-menu') {
            mobOpenClose();
        }
		
        if (target.parentNode.parentNode.className == 'shell-header-dropdown-tab') {
            if (flag) {
                if (flag == target) {
                    target.parentNode.nextSibling.style.display = target.parentNode.nextSibling.style.display ? '' : 'block';
                } else {
                    flag.parentNode.nextSibling.style.display = '';
                    target.parentNode.nextSibling.style.display = 'block';
                    flag = target;
                }
            } else {
                target.parentNode.nextSibling.style.display = 'block';
                flag = target;
            }

        }
    }
	
    tree.onmouseover = function(evt) {

        var evt = evt || event;
        var target = evt.target || evt.srcElement;
        if (menu.className.indexOf(' opened') == -1)
            if (target.parentNode.parentNode.className == 'shell-header-dropdown-tab') {
                flagDown()
                target.parentNode.parentNode.className = 'shell-header-dropdown-tab active';
                if (target.parentNode.nextSibling) {
                    target.parentNode.nextSibling.style.height = Math.max(target.parentNode.parentNode.parentNode.offsetHeight, target.parentNode.nextSibling.offsetHeight) + 'px';
                    target.parentNode.parentNode.parentNode.style.height = Math.max(target.parentNode.parentNode.parentNode.offsetHeight, target.parentNode.nextSibling.offsetHeight) + 'px';
                }
                if (flag) {
                    flag.parentNode.parentNode.className = 'shell-header-dropdown-tab';
                }

                flag = target;

            }

    }
	
    $(window).resize(function() {
        if (resMob == true) {
            if ($(this).width() >= 899) {
                flagDown();
                resMob = false;
                if (menu.className.indexOf(' opened') > -1) {
                    menu.className = menu.className.substring(0, menu.className.indexOf(" "));
                    menu.style.display = '';
                }
                if (flag)
                    flag.parentNode.parentNode.parentNode.style.display = '';
            }
        } else {
            if ($(this).width() < 899) {
                flagDown();
                resMob = true;
            }
        }
    });
}



function validate(form) {
    var elems = form.elements;
    var rmail = /^\w+@\w+\.\w{2,4}$/i;
    var rname = /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/;
    var rpass = /[^\s][\w\W^\s]{6,18}/;
    var isValid = true;

    elems.name.classList.remove("error");
    if (!rname.test(elems.name.value)) {
        elems.name.classList.add("error");
        isValid = false;
    }

    elems.password.classList.remove("error");
    if (!rpass.test(elems.password.value)) {
        elems.password.classList.add("error");
        isValid = false;
    }


    elems.email.classList.remove("error");

    if (!rmail.test(elems.email.value)) {
        elems.email.classList.add("error");
        isValid = false;
    }

    if (isValid)
        return true;
    else return false;
}
