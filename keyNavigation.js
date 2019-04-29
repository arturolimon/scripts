/* 
 * Script for Shortkeys Chrome extension.
 *
 * Enables key navigation on google search results using vim-style keys:
 *  k-> up
 *  j-> down
 *  Enter -> Go to highlighted result
 *  ctrl+Enter -> Open highlighted result in new tab
 */

const scrollOffset = 80
const upKey        = 75 //k
const downKey      = 74 //j

document.selectedResultId=0

function scrollToElement(el, offset)
{  
  
  const bodyRect = document.body.getBoundingClientRect().top;
  const elementRect = el.getBoundingClientRect().top;
  const elementPosition = elementRect - bodyRect;
  const offsetPosition = elementPosition - offset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

function selectResult(newId)
{
    els = document.querySelectorAll("div.r h3")
    if(newId < 0 || newId >= els.length)
        return  //Could modify for page nav...?
    rp = document.getElementById("result-pointer")
    if(rp != null){
        rp.remove()
    }
    document.selectedResultId=newId
    el = els[newId]
    lnk = el.firstElementChild
    el.innerHTML = "<div id=\"result-pointer\" style=\"position:absolute;left:-15px;\">&gt;</div>" + el.innerHTML
  
    scrollToElement(el, scrollOffset)
  	
}
document.onkeyup=function(event)
{
    if(event.keyCode==upKey)//if(event.keyCode==38)
        selectResult(document.selectedResultId-1)
    if(event.keyCode==downKey)//if(event.keyCode==40)
        selectResult(document.selectedResultId+1)
    if(event.keyCode==13)
    {
      var el = document.querySelectorAll("div.r h3")[document.selectedResultId]
      var lnk = el.parentElement
      var url = lnk.href
      if(event.ctrlKey)
      {
        var win = window.open(url,"_blank")
        win.blur()
        window.open().close()
      }
      else
        document.location = url
      
    }
}

selectResult(0)
