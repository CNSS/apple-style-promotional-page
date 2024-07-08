let isVertical = false
if (window.innerHeight > window.innerWidth) {
  isVertical = true
}

let isTouch = false
if ('ontouchstart' in window) {
  isTouch = true
}

// 解决直接用 triggerjs 会闪烁的问题
const title_chinese = document.getElementsByClassName("title_chinese")[0]
const titleWrapper = document.getElementsByClassName("container title wrapper")[0]
title_chinese.style.setProperty('--perc', "100%")

// Cards 动态加载
const cardsWrapper = document.getElementsByClassName("container cards wrapper")[0]
let cardsLoaded = false

// terminal scrolled
// const terminalWrapper = document.getElementsByClassName("container terminal wrapper")[0]
// const terminalBodies = document.getElementsByClassName("terminal-body")
// const terminalTop = 40;

document.addEventListener('scroll', (e) => {
  // 解决直接用 triggerjs 会闪烁的问题
  let scrolled = titleWrapper.style.getPropertyValue('--percent')
  // console.log(scrolled)
  if (scrolled > 1) {
    scrolled = 1
  } else if (scrolled < 0) {
    scrolled = 0
  }
  title_chinese.style.setProperty('--perc', `${scrolled * 100}%`)

  // Cards 动态加载
  if (cardsWrapper.getBoundingClientRect().top < window.innerHeight && cardsWrapper.getBoundingClientRect().bottom > 0) {
    if (!cardsLoaded) {
      cardsLoaded = true
      // TODO: 加载 Cards
    }
  }

  // terminal scrolled
  // for (let i = 0; i < terminalBodies.length; i++) {
  //   if (terminalBodies[i].getBoundingClientRect().top < window.innerHeight && terminalBodies[i].getBoundingClientRect().bottom > 0) {
  //     let top = terminalBodies[i].getBoundingClientRect().top
  //     if (Math.abs(top - terminalTop) < 1) {
  //       console.log("top")
  //
  //     }
  //   }
  // }
})

// 切换关键词
const keywordsWrapper = document.getElementsByClassName("container keywords wrapper")[0]
document.addEventListener('scroll', (e) => {
  let scrolled = 1 - keywordsWrapper.style.getPropertyValue('--percent')
  // console.log(scrolled)
  if (scrolled > 1) {
    scrolled = 1
  } else if (scrolled < 0) {
    scrolled = 0
  }
  let keywords = document.getElementsByClassName("div keywords")
  if (keywords.length == 0) {
    return
  }
  let select = Math.floor(scrolled * keywords.length)
  let up = null
  for (let i = 0; i < keywords.length; i++) {
    if (keywords[i].hasAttribute('data-show')) {
      let show = i
    }
  }

  for (let i = 0; i < select; i++) {
    if (!keywords[i].hasAttribute['data-up']) {
      keywords[i].setAttribute('data-up', '')
    }
    if (keywords[i].hasAttribute('data-show')) {
      keywords[i].removeAttribute('data-show')
    }
  }

  for (let i = select; i < keywords.length; i++) {
    if (keywords[i].hasAttribute('data-up')) {
      keywords[i].removeAttribute('data-up')
    }
    if (keywords[i].hasAttribute('data-show')) {
      keywords[i].removeAttribute('data-show')
    }
  }

  keywords[select].setAttribute('data-show', '')
})

// 防止弹窗正文部分点击穿透
const popupContainers = document.getElementsByClassName("popup-container")
for (let i = 0; i < popupContainers.length; i++) {
  popupContainers[i].addEventListener('click', (e) => {
    e.stopPropagation()
  })
}

const popupBackground = document.getElementsByClassName("popup-background")[0]
// 绑定弹窗
function popup(popupElement) {
  if (!popupElement) {
    return
  }

  popupBackground.style.display = "block"
  popupElement.style.display = "block"
  popupElement.style.opacity = 1
  this.setTimeout(() => {
    popupBackground.style.setProperty('backdrop-filter', 'blur(20px)')
    popupBackground.style.setProperty('-webkit-backdrop-filter', 'blur(20px)')
    popupElement.style.top = 0
  }, 0)

  // set overflow:hidden to body and html
  document.body.style.overflow = "hidden"
  document.documentElement.style.overflow = "hidden"

  // add close event
  function eventClose(popupElement) {
    popupElement.style.top = "100%"
    popupBackground.style.setProperty('backdrop-filter', 'blur(0px)')
    popupBackground.style.setProperty('-webkit-backdrop-filter', 'blur(0px)')
    this.setTimeout(() => {
      popupElement.style.display = "none"
      popupBackground.style.display = "none"
    }, 400)
    // remove overflow:hidden
    document.body.style.overflow = ""
    document.documentElement.style.overflow = ""
  }

  popupElement.getElementsByClassName("popup-close-btn")[0].addEventListener('click', eventClose.bind(this, popupElement))
  popupElement.addEventListener('click', eventClose.bind(this, popupElement))
}

// Card List-items add popup onclick event
const cardFaces = document.getElementsByClassName("card-face")
for (let i = 0; i < cardFaces.length; i++) {
  let popupName = cardFaces[i].getAttribute("popup")
  let popupElement = document.getElementsByClassName("popup " + popupName)[0]
  let button = cardFaces[i].parentElement.getElementsByClassName("card-button-more")[0]
  button.addEventListener('click', popup.bind(this, popupElement))
}


// 检测图片滚动进度
const reimbursement = document.getElementsByClassName("popup-content-card-image reimbursement")
const matchPopup = document.getElementsByClassName("popup money")[0].getElementsByClassName("popup-container")[0]
matchPopup.addEventListener('scroll', (e) => {
  for (let i = 0; i < reimbursement.length; i++) {
    if (reimbursement[i].getBoundingClientRect().top < window.innerHeight && reimbursement[i].getBoundingClientRect().bottom > 0) {
      let scrolled = 1 - reimbursement[i].getBoundingClientRect().top / window.innerHeight
      let range = [0.1, 0.4]
      if (isVertical) {
        range = [0.0, 0.3]
      }
      scrolled = (scrolled - range[0]) / (range[1] - range[0])
      if (scrolled > 1) {
        scrolled = 1
      } else if (scrolled < 0) {
        scrolled = 0
      }
      let size = `${Math.floor(scrolled * 80)}%`
      if (reimbursement[i].style.getPropertyValue('background-size') != size) {
        reimbursement[i].style.setProperty('background-size', size)
      }
    }
  }
})



let offersImages = ["ms", "bd", "ali", "jd", "tx"]
let schoolsImages = ["kaust", "cmu", "pku", "thu"]
// const yak = document.getElementsByClassName("popup-content-card-image yak")[0]
const offers = document.getElementsByClassName("popup-content-card-image offers")[0]
const schools = document.getElementsByClassName("popup-content-card-image schools")[0]
const offerPopup = document.getElementsByClassName("popup offer")[0].getElementsByClassName("popup-container")[0]

// yak.style.setProperty('--percent', 0)
offers.style.setProperty('--bg-opacity', 0)
schools.style.setProperty('--bg-opacity', 0)

// 预加载
let bg = ""
for (let i = 0; i < offersImages.length; i++) {
  bg += `url(/static/img/offers/${offersImages[i]}.png) no-repeat center center / cover,`
}
offers.style.setProperty('--bg', bg.slice(0, -1))

bg = ""
for (let i = 0; i < schoolsImages.length; i++) {
  bg += `url(/static/img/schools/${schoolsImages[i]}.png) no-repeat center center / cover,`
}
schools.style.setProperty('--bg', bg.slice(0, -1))

let handler = (e) => {
  // Yak 聚光灯效果
  // if (!isVertical) {
  //   if (yak.getBoundingClientRect().top < window.innerHeight && yak.getBoundingClientRect().bottom > 0) {
  //     let scrolled = 1 - yak.getBoundingClientRect().top / window.innerHeight
  //     if (scrolled > 1) {
  //       scrolled = 1
  //     } else if (scrolled < 0) {
  //       scrolled = 0
  //     }
  //     if (isVertical) {
  //       yak.style.setProperty('--percent', `${scrolled}`)
  //     } else {
  //       yak.style.setProperty('--percent', `${scrolled - 0.5}`)
  //     }
  //   }
  // }


  // Offers 逐个出现
  if (offers.getBoundingClientRect().top < window.innerHeight && offers.getBoundingClientRect().bottom > 0) {
    let scrolled = 1 - offers.getBoundingClientRect().top / window.innerHeight
    let range = [0.3, 0.8]
    if (isVertical) {
      range = [0.2, 0.6]
    }
    scrolled = (scrolled - range[0]) / (range[1] - range[0])
    if (scrolled > 1) {
      scrolled = 1
    } else if (scrolled < 0) {
      scrolled = 0
    }

    let percent = scrolled * offersImages.length
    let select = Math.floor(percent)
    let bg = ""
    for (let i = select - 1; i >= 0; i--) {
      bg += `url("/static/img/offers/${offersImages[i]}.png") no-repeat center center / cover,`
    }
    bg = bg.slice(0, -1)
    if (offers.style.getPropertyValue('--bg') != bg) {
      offers.style.setProperty('--bg', bg)
      if (select < offersImages.length) {
        offers.style.setProperty('--after-bg', `url("/static/img/offers/${offersImages[select]}.png") no-repeat center center / cover`)
      } else {
        offers.style.setProperty('--after-bg', `rgba(0, 0, 0, 0)`)
      }
    }

    let opacity = percent - select
    opacity = Math.round(opacity * 100) / 100
    if (offers.style.getPropertyValue('--bg-opacity') != opacity) {
      offers.style.setProperty('--bg-opacity', opacity)
    }
  }


  // Schools 逐个出现
  if (!isVertical) {
    if (schools.getBoundingClientRect().top < window.innerHeight && schools.getBoundingClientRect().bottom > 0) {
      let scrolled = 1 - schools.getBoundingClientRect().top / window.innerHeight
      let range = [0.3, 0.8]
      if (isVertical) {
        range = [0, 0.3]
      }
      scrolled = (scrolled - range[0]) / (range[1] - range[0])
      if (scrolled > 1) {
        scrolled = 1
      } else if (scrolled < 0) {
        scrolled = 0
      }
      let percent = scrolled * schoolsImages.length
      let select = Math.floor(percent)
      let bg = ""
      for (let i = select - 1; i >= 0; i--) {
        bg += `url("/static/img/schools/${schoolsImages[i]}.png") no-repeat center center / cover,`
      }
      bg = bg.slice(0, -1)
      if (schools.style.getPropertyValue('--bg') != bg) {
        schools.style.setProperty('--bg', bg)
        if (select < schoolsImages.length) {
          schools.style.setProperty('--after-bg', `url("/static/img/schools/${schoolsImages[select]}.png") no-repeat center center / cover`)
        } else {
          schools.style.setProperty('--after-bg', `none`)
        }
      }
      let opacity = percent - select
      opacity = Math.round(opacity * 100) / 100
      if (schools.style.getPropertyValue('--bg-opacity') != opacity) {
        schools.style.setProperty('--bg-opacity', opacity)
      }
    }
  } else {
    // 手机直接显示
    // let bg = ""
    // for (let i = schoolsImages.length - 1; i >= 0; i--) {
    //   bg += `url(/static/img/schools/${schoolsImages[i]}.png) no-repeat center center / cover,`
    // }
    // schools.style.setProperty('--bg', bg.slice(0, -1))
  }
}
offerPopup.addEventListener('scroll', handler)

// 循环切换 nav-bar-element radio
// <input type="radio" name="nav" id="nav-1" class="nav-bar-element">
// <input type="radio" name="nav" id="nav-2" class="nav-bar-element">
// <input type="radio" name="nav" id="nav-3" class="nav-bar-element">
// <input type="radio" name="nav" id="nav-4" class="nav-bar-element">
// <input type="radio" name="nav" id="nav-5" class="nav-bar-element">
// <input type="radio" name="nav" id="nav-6" class="nav-bar-element">
let navBarElements = document.getElementsByClassName("nav-bar-element")
let currentNav = 0
const navImagesDiv = document.getElementsByClassName("nav-images")[0]
const navIntervalHandler = () => {
  if (navImagesDiv.getBoundingClientRect().top > window.innerHeight || navImagesDiv.getBoundingClientRect().bottom < 0) {
    return
  }

  currentNav = (currentNav + 1) % navBarElements.length
  navBarElements[currentNav].click()
}
let navInterval = setInterval(navIntervalHandler, 3000)
for (let i = 0; i < navBarElements.length; i++) {
  navBarElements[i].addEventListener('click', (e) => {
    currentNav = i
    clearInterval(navInterval)
    navInterval = setInterval(navIntervalHandler, 3000)
  })
}


// terminal scrolled
// const terminalWrapper = document.getElementsByClassName("container terminal wrapper")[0]
// const terminalBlocks = terminalWrapper.getElementsByClassName("terminal-block")
//
// terminalWrapper.addEventListener('tg', (e) => {
//   let value = e.detail.value
//
//   let isLastResShown = false
//   for (let i = 0; i < terminalBlocks.length; i++) {
//     let cmdStart = terminalBlocks[i].getAttribute("cmd-start")
//     let resStart = terminalBlocks[i].getAttribute("res-start")
//     let hideStart = terminalBlocks[i].getAttribute("hide-start")
//
//     if (hideStart) {
//       if (value >= hideStart) {
//         terminalBlocks[i].style.display = "none"
//         continue
//       }
//     }
//
//     let cmd = terminalBlocks[i].getElementsByClassName("terminal-command")[0]
//     let cursor = terminalBlocks[i].getElementsByClassName("terminal-cursor")[0]
//     let result = terminalBlocks[i].getElementsByClassName("terminal-result")[0]
//
//     if (cmdStart && resStart) {
//       if (value < cmdStart) {
//         if (isLastResShown) {
//           terminalBlocks[i].style.display = "block"
//           terminalBlocks[i].style.transition = "none"
//           terminalBlocks[i].style.maxHeight = "5rem"
//
//           cmd.style.maxWidth = "0"
//           cmd.style.transition = "max-width 0.5s steps(20, end)"
//           cursor.style.display = "block"
//           result.style.display = "none"
//         } else {
//           if (i != 0) {
//             terminalBlocks[i].style.display = "none"
//             terminalBlocks[i].style.transition = "none"
//           }
//           terminalBlocks[i].style.maxHeight = "10rem"
//
//           cmd.style.maxWidth = "0"
//           cmd.style.transition = "none"
//         }
//       }
//
//       if (value >= cmdStart && value < resStart) {
//         terminalBlocks[i].style.display = "block"
//         terminalBlocks[i].style.transition = "none"
//         terminalBlocks[i].style.maxHeight = "5rem"
//
//         cmd.style.transition = "max-width 0.5s steps(20, end)"
//         setTimeout(() => {
//           cmd.style.maxWidth = "var(--cmd-max-width)"
//         }, 0)
//
//         cursor.style.display = "block"
//         result.style.display = "none"
//       }
//
//       isLastResShown = false
//       if (value >= resStart) {
//         terminalBlocks[i].style.display = "block"
//         terminalBlocks[i].style.transition = "max-height 0.3s steps(20, end)"
//         setTimeout(() => {
//           if (terminalBlocks[i].style.getPropertyValue("--block-max-height")) {
//             terminalBlocks[i].style.maxHeight = terminalBlocks[i].style.getPropertyValue("--block-max-height")
//           } else {
//             terminalBlocks[i].style.maxHeight = "55rem"
//           }
//         }, 0)
//
//         cmd.style.maxWidth = "var(--res-max-width)"
//         cmd.style.transition = "none"
//
//         cursor.style.display = "none"
//
//         result.style.display = "block"
//
//         isLastResShown = true
//       }
//     }
//   }
//
// })
//

const cardSet = document.querySelector('.card-set');
const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');
let scrollAmount = 0;
let scrollStep = cardSet.querySelector('.list-items').offsetWidth + parseFloat(getComputedStyle(cardSet).columnGap);

function updateButtons() {
  leftArrow.disabled = cardSet.scrollLeft <= 100;
  rightArrow.disabled = cardSet.scrollLeft >= cardSet.scrollWidth - cardSet.clientWidth - 100;

  scrollStep = cardSet.querySelector('.list-items').offsetWidth + parseFloat(getComputedStyle(cardSet).columnGap);
}

leftArrow.addEventListener('click', () => {
  cardSet.scrollBy({
    left: -scrollStep,
    behavior: 'smooth'
  });
});

rightArrow.addEventListener('click', () => {
  cardSet.scrollBy({
    left: scrollStep,
    behavior: 'smooth'
  });
});

cardSet.addEventListener('scroll', updateButtons);
window.addEventListener('resize', updateButtons);

// Initial check to set button states
updateButtons();

const faqItems = document.querySelectorAll('.faq-item');
const faqList = document.querySelector('.faq-list');
const faqWrapper = document.querySelectorAll('.container.faq.wrapper')[1];
const stickyGate = 0.25
const stickyGateMax = 0.75

faqWrapper.addEventListener('tg', () => {
  if (faqWrapper.style.getPropertyValue('--rev-percent') < stickyGate || faqWrapper.style.getPropertyValue('--rev-percent') > stickyGateMax) {
    faqList.style.gridTemplateRows = '1fr '.repeat(faqItems.length - 1) + '1fr';
    faqList.removeAttribute('sticky');

  } else {
    faqList.setAttribute('sticky', '');

    let rows = '';
    faqItems.forEach((faqItem) => {
      if(faqItem.hasAttribute('focused')) {
        rows += '4fr ';
      } else {
        rows += '1fr ';
      }
    })

    if (!isVertical) {
      faqList.style.gridTemplateRows = rows;
    }
  }
})

faqItems.forEach((item, index) => {
  if (!isVertical) {
    item.addEventListener('mouseenter', () => {
      faqItems.forEach((faqItem, i) => {
        if (i !== index) {
          faqItem.removeAttribute('focused');
        } else {
          faqItem.setAttribute('focused', '');
        }
      });

      if (faqWrapper.style.getPropertyValue('--rev-percent') < stickyGate || faqWrapper.style.getPropertyValue('--rev-percent') > stickyGateMax) {
        faqList.style.gridTemplateRows = '1fr '.repeat(faqItems.length - 1) + '1fr';
        return
      }

      const rows = Array.from({ length: faqItems.length }, (_, i) => (i === index ? '4fr' : '1fr')).join(' ');
      faqList.style.gridTemplateRows = rows;
    });

    item.addEventListener('mouseleave', () => {
      faqList.style.gridTemplateRows = '1fr '.repeat(faqItems.length - 1) + '1fr';

      faqItems.forEach((faqItem) => {
        faqItem.removeAttribute('focused');
      });
    });
  }else{
    item.addEventListener('click', () => {
      let rows = '1fr '.repeat(faqItems.length - 1) + '1fr';

      if (item.hasAttribute('focused')) {
        item.removeAttribute('focused');
        rows = '1fr '.repeat(faqItems.length - 1) + '1fr';
      } else {
        rows = Array.from({ length: faqItems.length }, (_, i) => (i === index ? '4fr' : '1fr')).join(' ');

        faqItems.forEach((faqItem, i) => {
          if (i !== index) {
            faqItem.removeAttribute('focused');
          } else {
            faqItem.setAttribute('focused', '');
          }
        });
      }

      if (faqWrapper.style.getPropertyValue('--rev-percent') < stickyGate || faqWrapper.style.getPropertyValue('--rev-percent') > stickyGateMax) {
        faqList.style.gridTemplateRows = '1fr '.repeat(faqItems.length - 1) + '1fr';
        return
      }
      faqList.style.gridTemplateRows = rows;
    });
  }
});


// 循环切换 card-flip
let flipBackground = document.getElementsByClassName("flip-background")[0]
let cardFlips = document.getElementsByClassName("card-flip")
cardFlips = Array.from(cardFlips)
let pockerContainer = document.getElementsByClassName("pocker-container")[0]
let len = cardFlips.length
pockerContainer.style.setProperty('--total-card-count', len)
flipBackground.style.setProperty('z-index', len + 1)
let currentIdx = 1

function closeCard() {
  let card = document.querySelector('.card-flip[flipped]')
  card.removeAttribute('flipped')
  flipBackground.style.setProperty('backdrop-filter', 'blur(0px)')
  flipBackground.style.setProperty('-webkit-backdrop-filter', 'blur(0px)')
  setTimeout(() => {
    flipBackground.style.display = "none"
  }, 400)
  document.documentElement.style.overflow = ""
}

flipBackground.addEventListener('click', closeCard)

// press esc to close card
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeCard()
  }
})

cardFlips.forEach((cardFlip) => {
  let index = currentIdx
  currentIdx++
  cardFlip.style.setProperty('--index', index)
  cardFlip.style.setProperty('z-index', index)

  cardFlip.addEventListener('click', (e) => {
    let card = e.currentTarget
    if (!card.hasAttribute('flipped')) {
      card.setAttribute('flipped', '')
      flipBackground.style.display = "block"
      setTimeout(() => {
        flipBackground.style.setProperty('backdrop-filter', 'blur(20px)')
        flipBackground.style.setProperty('-webkit-backdrop-filter', 'blur(20px)')
      }, 0)
      document.documentElement.style.overflow = "hidden"
    }
  })

  cardFlip.addEventListener('mouseenter', (e) => {
    let card = e.currentTarget
    if (card.hasAttribute('flipped')) {
      return
    }
    card.style.setProperty('transform', 'scale(1.1) var(--transform) translateY(-40%)')
    let index = cardFlips.indexOf(card) + 1
    let start = index + 1.3
    let end = len + 0.8
    let step = (end - start) / (len - index);
    for (let i = 0; i <= len - index; i++) {
      cardFlips[index + i].style.setProperty('--index', start + i * step)
    }
    // cardFlips[len - 1].style.setProperty('--index', end)
  })

  cardFlip.addEventListener('mouseleave', (e) => {
    let currentIdx = 1
    cardFlips.forEach((cardFlip) => {
      let index = currentIdx
      currentIdx++
      cardFlip.style.setProperty('--index', index)
      cardFlip.style.setProperty('transform', 'var(--transform)')
    })
  })
})
