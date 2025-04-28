import { API_ENDPOINTS } from "../../../config/apiEndPoints";
import Fetch from "../../util/api/Fetch";
import { createTemplateCardHTML } from "../templates/elementTemplate";
import UpdateTemplateView from "./UpdateTemplateView";

export default class MessageTemplate{
      constructor(){
            // カード要素の取得
            this.templateCards = document.querySelectorAll('.template-card');
            this.expandBtns = document.querySelectorAll('.expand-btn');
            this.selectedName = document.getElementById('selected-template-name');
            this.selectedContent = document.getElementById('selected-template-content');
            this.copyBtn = document.getElementById('copy-template');
            this.useTemplateBtn = document.getElementById('use-template');
            
            // フィルター関連の要素
            this.filterButtons = document.querySelectorAll('.filter-button');
            this.clearFilterBtn = document.querySelector('.clear-filter');
            this.noResultsMessage = document.querySelector('.no-results');

            // アクティブなフィルターを追跡する配列
            this.activeFilters = [];
            this.initialize()

            
      }

      initialize(){
            this.filterButtons.forEach((filterButton)=>{
                  filterButton.addEventListener("click", this.#handleFilter.bind(this)); 
            })

            this.clearFilterBtn.addEventListener("click", this.#handleClearFilter.bind(this))
            this.expandBtns.forEach((expandBtn)=>{
                  expandBtn.addEventListener("click", this.#handleExpand.bind(this))
            })
            
      }

      // 展開ボタンの機能
      #handleExpand(event){
            const card = event.target.closest('.template-card');
            const content = card.querySelector('.template-content');

            content.classList.toggle('active');
            event.target.classList.toggle('active');
      }

      #handleClearFilter(){
              // すべてのフィルターボタンからアクティブクラスを削除
            this.filterButtons.forEach(btn => {
                  btn.classList.remove('active');
            });
            
            // アクティブなフィルターをクリア
            this.activeFilters = [];
            
            // フィルターを再適用（すべて表示）
            this.#applyFilters();
      }
      // フィルターボタンのイベントリスナー
      #handleFilter(event){
            const tag = event.target.getAttribute('data-tag');
            this.filterButtons.forEach((btn)=> btn.classList.remove("active"))

            // ボタンのアクティブ状態を切り替え
            event.target.classList.add('active');
            this.activeFilters = []
            // アクティブなフィルターリストを更新
            if (event.target.classList.contains('active')) {
                  this.activeFilters.push(tag);
            } 
            
            // フィルターを適用
            this.#applyFilters();
      }


      // フィルターを適用する関数
      async #applyFilters(){

            let activeFilters = []
            let visibleCount = 0;
            const templateWrapper = document.querySelector(".templates-grid")
            this.templateCards.forEach(card => {
                  const cardTags = card.getAttribute('data-tags').split(',');
                  // アクティブなフィルターがない場合はすべて表示
                  if (this.activeFilters.length === 0) {
                        activeFilters.push(card)
                        card.classList.remove('hidden');
                        visibleCount++;
                  }else{
                      // カードがアクティブなフィルターのいずれかに一致するか確認
                        const isVisible = this.activeFilters.some(filter => cardTags.includes(filter));
                        
                        if (isVisible) {
                              activeFilters.push(card)
                              card.classList.remove('hidden');
                              visibleCount++;
                        } else {
                              card.classList.add('hidden');
                        }
                  }
            });
            


            activeFilters.sort((a, b) => {
                  return parseInt(a.dataset.order) - parseInt(b.dataset.order);
            });


            activeFilters.forEach((card)=>{
                  templateWrapper.appendChild(card)
            })
            
            UpdateTemplateView.getInstance();


            
            // 表示されているカードがなければ「結果なし」メッセージを表示
            if (visibleCount === 0) {
                  this.noResultsMessage.style.display = 'block';
            } else {
                  this.noResultsMessage.style.display = 'none';
            }
      }
}