class HDCarousel {
  version = 0.1;
  el = null;
  // 캐러셀에 들어갈 아이템들
  items = [];
  // 보여질 아이템
  size = 3;
  gap = 0;
  item = {
    width: 0,
    gap: 0,
    left: 0,
  };

  constructor(el, settings = {}) {
    console.log("HDCarousel" + this.version + " init");
    // element의 타입이 무엇인 지 모르겠지만
    // el이 올바르지 않을 때 에러를 발생시키고 return 하면 좋을 것 같음
    this.el = el;
    this.items = el.getElementsByClassName("hdcarousel_item");
    this.init();
  }

  async init() {
    this.item.width = await this.getSize();
    this.el.style.height = this.items[0].clientHeight + "px";

    await this.clone("prev");
    await this.build();

    //setInterval(() => this.next(), 2000);
  }

  async getSize() {
    let w = this.el.clientWidth;
    w = w / this.size;
    return w;
  }

  async build() {
    let l = this.item.width * -1;
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].style.width = this.item.width + "px";
      this.items[i].style.left = l + "px";
      l += this.item.width;
    }
  }

  async clone(pos = "next") {
    let item = 0;
    if (pos === "next") {
      item = this.items[0];
    } else {
      item = this.items[this.items.length - 1];
    }
    // clone을 뜻하는 c인것 같다.
    let c = item.cloneNode(true); //  true는 자식까지 다 복사

    if (pos === "next") {
      this.el.append(c);
    } else {
      this.el.prepend(c);
    }
    // 복사해서 넣은 다음에 기존 아이템은 삭제한다.
    item.remove();
  }

  async next() {
    await this.clone("next");
    await this.build();
  }
}

const el = document.getElementById("like_and_sub");
new HDCarousel(el);
