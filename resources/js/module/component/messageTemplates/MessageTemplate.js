import UpdateTemplateView from "./UpdateTemplateView";

export default class MessageTemplate{
      constructor(){
            // カード要素の取得
            this.templateCards = document.querySelectorAll('.template-card');
            this.expandBtns = document.querySelectorAll('.expand-btn');
            this.selectBtns = document.querySelectorAll('.select-btn')
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
            new UpdateTemplateView()
            
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

            console.log(event);
            
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

            // ボタンのアクティブ状態を切り替え
            event.target.classList.toggle('active');
            
            // アクティブなフィルターリストを更新
            if (event.target.classList.contains('active')) {
                  this.activeFilters.push(tag);
            } else {
                  this.activeFilters = this.activeFilters.filter(filter => filter !== tag);
            }
            
            // フィルターを適用
            this.#applyFilters();
      }

      // フィルターを適用する関数
      #applyFilters(){
            let visibleCount = 0;
            
            this.templateCards.forEach(card => {
                  const cardTags = card.getAttribute('data-tags').split(',');
                  // アクティブなフィルターがない場合はすべて表示
                  if (this.activeFilters.length === 0) {
                        card.classList.remove('hidden');
                        visibleCount++;
                        return;
                  }
                  
                  // カードがアクティブなフィルターのいずれかに一致するか確認
                  const isVisible = this.activeFilters.some(filter => cardTags.includes(filter));
                  
                  if (isVisible) {
                        card.classList.remove('hidden');
                        visibleCount++;
                  } else {
                        card.classList.add('hidden');
                  }
            });
            
            // 表示されているカードがなければ「結果なし」メッセージを表示
            if (visibleCount === 0) {
                  this.noResultsMessage.style.display = 'block';
            } else {
                  this.noResultsMessage.style.display = 'none';
            }
      }
}