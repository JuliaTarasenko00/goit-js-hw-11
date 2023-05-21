export default class loadMoreBtn {
static classes = {
    hidden: "hidden",
}
constructor(selector, isHidden = false) {
this.button = this.btnLoadMore(selector)
// if(isHidden === true){
//     this.hideBtn();
// }
isHidden && this.hideBtn();
}
btnLoadMore(selector){
    return document.querySelector(selector);
}
hideBtn(){
    this.button.classList.add(loadMoreBtn.classes.hidden);
}
removeBtn(){
    this.button.classList.remove(loadMoreBtn.classes.hidden);
}
disable(){
    this.button.disabled = true;
}
enable(){
    this.button.disabled = false;
}
}

