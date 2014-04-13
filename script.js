var options = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e'];

var hexValue = '';
var colorCodePref = 'hex';
// var c_colorCodePref = '';
var lastSavedColor = '';

var $bgBtn = document.getElementById('bgBtn');
var $panel = document.getElementById('panel');
var $savedColors = document.getElementById('savedColors');
var $scrollWrapper = document.getElementById('scrollWrapper');
var $colorCodeLabel = document.getElementById('colorCodeLabel');
var $infoBtn = document.getElementById('infoBtn');
var $popupOverlay = document.getElementById('popupOverlay');
var $infoContent = document.getElementById('infoContent');
var $closeBtn = document.getElementById('closeBtn');
var $hexInput = document.getElementById('hexInput');
var $rgbInput = document.getElementById('rgbInput');
var $panelToggleBtn = document.getElementById('panelToggleBtn');


if(docCookies.hasItem('c_colorCodePref'))
{
	// cookie does exist
	// read c_colorCodePref value and set form input accordingly
	var pref = docCookies.getItem('c_colorCodePref');
	// update checked input
	if(pref === $hexInput.value)
	{
		colorCodePref = pref;
		$hexInput.setAttribute('checked', 'checked');
		$rgbInput.removeAttribute('checked');
		updateLabel(hexValue);
	}
	else if(pref === $rgbInput.value)
	{
		colorCodePref = pref;
		$rgbInput.setAttribute('checked', 'checked');
		$hexInput.removeAttribute('checked');
		updateLabel(hexValue);
	}
}
else
{
	// cookie does not exist
	// display popup
	$popupOverlay.style.display = 'block';
	// create cookie c_colorCodePref with the value 'hex'
	setColorCodePref();
}

function setColorCodePref()
{
	if($hexInput.checked)
	{
		colorCodePref = 'hex';
		// update cookie
		docCookies.removeItem('c_colorCodePref');
		docCookies.setItem('c_colorCodePref', colorCodePref, 604800);
	}
	else if($rgbInput.checked)
	{
		colorCodePref = 'rgb';
		// update cookie
		docCookies.removeItem('c_colorCodePref');
		docCookies.setItem('c_colorCodePref', colorCodePref, 604800);
	}
	updateLabel(hexValue);
}

function getNewColor()
{
	generateRandomHex();
	setColor(hexValue);
	updateLabel(hexValue);
}
getNewColor();

function copyColorInit()
{
	var client = new ZeroClipboard( document.getElementById("colorCodeLabel"), {
	  moviePath: "ZeroClipboard.swf"
	} );

  client.on( "aftercopy", function( event ) {
    // `this` === `client`
    // `event.target` === the element that was clicked
    event.target.style.display = "none";
    alert("Copied text to clipboard: " + event.data["text/plain"] );
  } );
}
copyColorInit();

function generateRandomHex()
{
	hexValue = '#'
	for( var i = 0; i < 6; i++)
	{
		randomSelection = options[Math.floor(Math.random() * options.length)];
		hexValue += randomSelection;
	}
}

function updateLabel(hexValue)
{
	if(colorCodePref === 'hex')
	{
		$colorCodeLabel.innerHTML = hexValue + '<i id="copyBtn" class="fa fa-copy"></i>';
		$colorCodeLabel.setAttribute('data-clipboard-text', hexValue.toUpperCase());
	}
	else if(colorCodePref === 'rgb')
	{
		var rgbValue = document.body.style.backgroundColor;
		$colorCodeLabel.innerHTML = rgbValue  + '<i id="copyBtn" class="fa fa-copy"></i>';
		$colorCodeLabel.setAttribute('data-clipboard-text', rgbValue.toUpperCase());
	}
}

function setColor(hexValue)
{
	document.body.style.backgroundColor = hexValue;
}

function togglePanel()
{
	// If panel is open, close it
	if($panel.style.display === 'none')
	{
		$panelToggleBtn.style.top = '-30px';
		$panel.style.display = 'block';
	}
	else
	{
		$panelToggleBtn.style.top = '0';
		$panel.style.display = 'none';
	}
}

function toggleInfo()
{
	// If infoContent popup is open, close it
	if($popupOverlay.style.display === 'none')
	{
		$popupOverlay.style.display = 'block';
	}
	else
	{
		$popupOverlay.style.display = 'none';
	}
}

function closeAllTheThings()
{
	$panel.style.display = 'none';
	$panelToggleBtn.style.top = '0';
	$popupOverlay.style.display = 'none';
}

function saveColor()
{
	if(hexValue !== lastSavedColor)
	{
		// create new div node and append into savedColors
		var swatch = document.createElement('span');
		swatch.className = 'swatch';
		swatch.dataset.hex = hexValue;
		swatch.style.backgroundColor = hexValue;
		swatch.innerHTML = '<i class="fa fa-times-circle-o swatchCloseBtn" style="display: none;"></i>'
		$scrollWrapper.appendChild(swatch);
		$panel.style.display = 'block';
		var width = $scrollWrapper.scrollWidth;
		$scrollWrapper.scrollLeft += width;
		$panelToggleBtn.style.top = '-30px';
		lastSavedColor = hexValue;
	}
}

function swatchClicked(e)
{
	console.log('swatchClicked');
	// return (e.target && e.target.nodeName == 'SPAN') ? true : false;
	if(e.target && e.target.nodeName == 'SPAN')
	{
		console.log('swatchClicked be true');
		return true;
	}
	else
	{
		console.log('swatchClicked be false');
		return false;
	}
}

function showSwatchDetails(e)
{
	var hexValue = e.target.getAttribute('data-hex');
	setColor(hexValue);
	updateLabel(hexValue);
}

function swatchCloseBtnClicked(e)
{
	console.log('swatchCloseBtnClicked');
	// return (e.target && e.target.nodeName == 'I') ? true : false;
	if(e.target.nodeName == 'I')
	{
		console.log('swatchCloseBtnClicked be true');
		return true;
	}
	else
	{
		console.log('swatchCloseBtnClicked be false');
		return false;
	}
}

function removeSwatch(e)
{
	console.log('removeSwatch');
}

function toggleSwatchCloseBtn(e)
{
	if(e.target && e.target.nodeName == 'SPAN')
	{
		var i = e.target.getElementsByTagName('i')[0];
		if(i.style.display === 'none')
		{
			console.log('over');
			i.style.display = 'inline-block';
		}
		else if(i.style.display === 'inline-block')
		{
			console.log('out');
			i.style.display = 'none';
		}
	}
}


$hexInput.onchange = setColorCodePref;
$rgbInput.onchange = setColorCodePref;

window.addEventListener('keyup', registerKeyPress, false);


$bgBtn.addEventListener('click', getNewColor, false);
$infoBtn.addEventListener('click', toggleInfo, false);
$closeBtn.addEventListener('click', toggleInfo, false);
$popupOverlay.addEventListener('click', toggleInfo, false);
$panelToggleBtn.addEventListener('click', togglePanel, false);

// $scrollWrapper.addEventListener('click', function(e)
// {
// 	if(swatchClicked(e))
// 	{
// 		showSwatchDetails(e);
// 	}
// }, false);

// $scrollWrapper.addEventListener('click', function(e)
// {
// 	e.stopPropogation;
// 	if(swatchCloseBtnClicked(e))
// 	{
// 		removeSwatch(e);
// 	}
// }, false);

$scrollWrapper.addEventListener('click', function(e)
{
	if(swatchCloseBtnClicked(e))
	{
		removeSwatch(e);
	}
	else if(swatchClicked(e))
	{
		showSwatchDetails(e);
	}
}, false);

$scrollWrapper.addEventListener('mouseover', function(e)
{
	e.stopPropogation;
	toggleSwatchCloseBtn(e);
}, false);

// $scrollWrapper.addEventListener('mouseout', function(e)
// {
// 	e.stopPropogation;
// 	toggleSwatchCloseBtn(e);
// }, true);












