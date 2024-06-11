let isVertical = false
if (window.innerHeight > window.innerWidth) {
  isVertical = true
}

// 解决直接用 triggerjs 会闪烁的问题
const title_chinese = document.getElementsByClassName("title_chinese")[0]
const titleWrapper = document.getElementsByClassName("container title wrapper")[0]
title_chinese.style.setProperty('--perc', "100%")
document.addEventListener('scroll', (e) => {
  let scrolled = titleWrapper.style.getPropertyValue('--percent')
  console.log(scrolled)
  if (scrolled > 1) {
    scrolled = 1
  } else if (scrolled < 0) {
    scrolled = 0
  }
  title_chinese.style.setProperty('--perc', `${scrolled * 100}%`)
})

// 切换关键词
const keywordsWrapper = document.getElementsByClassName("container keywords wrapper")[0]
document.addEventListener('scroll', (e) => {
  let scrolled = 1 - keywordsWrapper.style.getPropertyValue('--percent')
  console.log(scrolled)
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
      show = i
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
    popupBackground.style.setProperty('--webkit-backdrop-filter', 'blur(20px)')
    popupElement.style.top = 0
  }, 0)

  // set overflow:hidden to body and html
  document.body.style.overflow = "hidden"
  document.documentElement.style.overflow = "hidden"

  // add close event
  function eventClose(popupElement) {
    popupElement.style.top = "100%"
    popupBackground.style.setProperty('backdrop-filter', 'blur(0px)')
    popupBackground.style.setProperty('--webkit-backdrop-filter', 'blur(0px)')
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
const cardFaces = document.getElementsByClassName("card face")
for (let i = 0; i < cardFaces.length; i++) {
  let popupName = cardFaces[i].getAttribute("popup")
  let popupElement = document.getElementsByClassName("popup " + popupName)[0]
  let button = cardFaces[i].parentElement.getElementsByClassName("card button")[0]
  button.addEventListener('click', popup.bind(this, popupElement))
}


// 检测图片滚动进度
const reimbursement = document.getElementsByClassName("popup-content-card-image reimbursement")
const matchPopup = document.getElementsByClassName("popup match")[0].getElementsByClassName("popup-container")[0]
matchPopup.addEventListener('scroll', (e) => {
  for (let i = 0; i < reimbursement.length; i++) {
    if (reimbursement[i].getBoundingClientRect().top < window.innerHeight && reimbursement[i].getBoundingClientRect().bottom > 0) {
      let scrolled = 1 - reimbursement[i].getBoundingClientRect().top / window.innerHeight
      range = [0.1, 0.4]
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
  bg += `url(/statics/img/offers/${offersImages[i]}.png) no-repeat center center / cover,`
}
offers.style.setProperty('--bg', bg.slice(0, -1))

bg = ""
for (let i = 0; i < schoolsImages.length; i++) {
  bg += `url(/statics/img/schools/${schoolsImages[i]}.png) no-repeat center center / cover,`
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
      range = [0.1, 0.6]
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
      bg += `url("/statics/img/offers/${offersImages[i]}.png") no-repeat center center / cover,`
    }
    bg = bg.slice(0, -1)
    if (offers.style.getPropertyValue('--bg') != bg) {
      offers.style.setProperty('--bg', bg)
      if (select < offersImages.length) {
        offers.style.setProperty('--after-bg', `url("/statics/img/offers/${offersImages[select]}.png") no-repeat center center / cover`)
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
      bg += `url("/statics/img/schools/${schoolsImages[i]}.png") no-repeat center center / cover,`
    }
    bg = bg.slice(0, -1)
    if (schools.style.getPropertyValue('--bg') != bg) {
      schools.style.setProperty('--bg', bg)
      if (select < schoolsImages.length) {
        schools.style.setProperty('--after-bg', `url("/statics/img/schools/${schoolsImages[select]}.png") no-repeat center center / cover`)
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
}
offerPopup.addEventListener('scroll', handler)