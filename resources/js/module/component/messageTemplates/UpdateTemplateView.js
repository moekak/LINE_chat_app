export default class UpdateTemplateView{
      /**
       * UpdateTemplateViewのコンストラクタ
       * 必要な要素の取得と初期設定を行う
       */
      constructor(){
            this.selectedTemplates = []  //選択されたテンプレートを格納 
            this.singleTemplateDisplay = document.querySelector('.selected-template-display');
            this.messagesContainer = document.querySelector('.selected-templates-messages')
            this.useAllBtn = document.querySelector('.use-all-templates-btn');
            this.chatViewContainer = document.createElement('div');
            this.templateCards = document.querySelectorAll('.template-card');
            this.generateChatViewContainer()
            this.addChatViewContainer()
            this.addClickEventToSelectButton()
            this.index = 0
      }


      resetIndex(){
            this.index = 0
      }
      /**
       * 選択されたテンプレートを表示するためのチャットビューコンテナを生成する
       * 
       * @returns {HTMLElement} 設定済みのチャットビューコンテナ要素
       */
      generateChatViewContainer(){
            this.chatViewContainer.className = 'selected-templates-chat';
            this.chatViewContainer.innerHTML = `
                  <h3 class="selected-templates-title">選択されたテンプレート</h3>
                  <div class="selected-templates-messages"></div>
                  <div class="selected-templates-actions">
                        <button class="use-all-templates-btn" type="submit" disabled>選択したテンプレートを使用 (0)</button>
                  </div>
            `;

            this.useAllBtn = this.chatViewContainer.querySelector(".use-all-templates-btn")
            this.messagesContainer = this.chatViewContainer.querySelector(".selected-templates-messages")
      }

      /**
       * チャット一覧の下にチャットビューコンテナを挿入する
       * 
       * @returns {void}
       */
      addChatViewContainer(){
            this.singleTemplateDisplay.appendChild(this.chatViewContainer);
      }


      /**
       * ボタンのテキストと状態を更新する
       * 
       * @returns {void}
       */
      #updateBtnTextAndState(){
            this.useAllBtn.textContent = `選択したテンプレートを使用 (${document.querySelectorAll(".chat-message-container").length})`;
            this.useAllBtn.disabled = document.querySelectorAll(".chat-message-container").length === 0;
      }


      /**
       * 選択されたテンプレート要素を生成する
       * 
       * @param {Object} template - テンプレートオブジェクト
       * @param {number} index - テンプレートのインデックス
       * @returns {HTMLElement} 生成されたテンプレート要素
       */
      #generateSelectedTemplateElement(){

            const contents = this.#formatContents()
            const messageEl = document.createElement('div');
            messageEl.className = 'chat-message-container';
            messageEl.dataset.count = this.selectedTemplates["count"]
            messageEl.dataset.templateId = this.selectedTemplates["template_id"]
            let messageContents = ""

            contents.forEach((content)=>{
                  if(content.content_type === "text"){
                        messageContents += `
                        <input type="hidden" name="contents[${this.index}][type]" value="text"/>
                        <textarea maxlength="1000"class="template_textarea" name="contents[${this.index}][content]" readonly>${content.content}</textarea>
                        `
                  }else if(content.content_type === "image"){
                        messageContents += `
                        <div style="display: flex;">
                              <input type="hidden" name="contents[${this.index}][type]" value="image"/>
                              <input type="hidden" name="contents[${this.index}][image_path]" value="${content.content}"/>
                              <input type="hidden" name="contents[${this.index}][cropArea]" value='${content.cropArea}'/>
                              <img src='${content.content}'/>
                        </div>`
                  }
                  this.index ++
            })

            messageEl.innerHTML = `
                  <div class="chat-message-header">
                        <span class="template-title">${this.selectedTemplates.title} / <i class="fa-solid fa-pen-to-square js_edit_btn"></i></span>
                        <button class="remove-template-btn" data-template-id="${this.selectedTemplates.template_id}">✕</button>
                  </div>
                  <div class="chat-message-body">
                        <input type="hidden" name="admin_uuid" value="${document.getElementById("js_sender_id").value}"/>
                        <input type="hidden" name="user_uuid" value="${document.getElementById("js_receiver_id").value}"/>
                        ${messageContents}
                  </div>
            `;

            return messageEl
      }

      /**
       * 選択されたテンプレート要素を順番通りに並び替える
       * 
       * @param {Object} template - テンプレートオブジェクト
       * @returns {Array} 生成されたテンプレート要素
       */
      #formatContents(){
            
            let data = []
            let index = 0
            let maxOrder = 0;
            // order が最も大きい値を探す
            if (this.selectedTemplates["contents"].length > 0) {
                  maxOrder = Math.max(...this.selectedTemplates["contents"].map(content => {
                        // orderが数値でない場合は数値に変換
                        const orderVal = parseInt(content.order) || 0;
                        return orderVal;
                  }));
            }

            while(index <= maxOrder){
                  const targetContent = this.selectedTemplates["contents"]?.find(content => content["order"] == index);
                  if(targetContent){
                        data.push({
                              "content" : targetContent["content"],
                              "content_type" : targetContent["type"],
                              "cropArea" : targetContent["cropArea"] ?? null,
                              "template_id" : this.selectedTemplates["template_id"]
                        })
                  }

                  index ++
            }
            return data
      }


      /**
       * 選択されたテンプレートのビューを更新する
       * 
       * @returns {void}
       */
      updateSelectedTemplatesView(){
            const messageEl = this.#generateSelectedTemplateElement()
            this.messagesContainer.appendChild(messageEl);
            // テンプレート選択解除処理
            document.querySelectorAll('.remove-template-btn').forEach(btn => {
                  const newBtn = btn.cloneNode(true)
                  btn.replaceWith(newBtn)
                  
                  newBtn.addEventListener('click', (event)=> {
                        this.removeButton(event)
                        this.#updateBtnTextAndState()
                  });
            });

            // テンプレートの編集処理
            document.querySelectorAll(".js_edit_btn").forEach((btn)=>{
                  btn.addEventListener("click", (event)=>{
                        this.editTemplate(event)
                  })
            })


            // Show or hide the chat view based on selection
            this.chatViewContainer.style.display = this.selectedTemplates ? 'block' : 'none';
      }

      /**
       * テンプレート編集処理(テキストのみメッセージの編集可能)
       * 
       * @param {Event} event - クリックイベント
       * @returns {void}
       */
      editTemplate(event){
            const parentElement = event.target.closest(".chat-message-container")
            const textareas = parentElement.querySelectorAll(".template_textarea")
            textareas.forEach((textarea)=>{
                  textarea.classList.add("active")
                  textarea.readOnly = false
            })
      }
      /**
       * テンプレート削除ボタンのクリックイベントハンドラ
       * 
       * @param {Event} event - クリックイベント
       * @returns {void}
       */
      removeButton(event){
            const id = event.target.dataset.templateId
            const targetTemplate = Array.from(document.querySelectorAll(".chat-message-container")).find((container)=> container.dataset.templateId === id)
            const card = Array.from(document.querySelectorAll(".template-card")).find((container)=> container.dataset.templateId === id)
            this.index = this.index - Number(targetTemplate.dataset.count)

            console.log(this.index);
            
            this.messagesContainer.removeChild(targetTemplate)
            if (card) {
                  card.classList.remove('selected');
                  const selectBtn = card.querySelector('.select-btn');
                  if (selectBtn) {
                        selectBtn.classList.remove('selected');
                        selectBtn.textContent = '選択';
                  }
            }
      }

      /**
       * テンプレートカードの選択ボタンにクリックイベントを追加する
       * 
       * @returns {void}
       */
      addClickEventToSelectButton(){
            this.templateCards.forEach(card => {
                  // Add a data-id attribute if it doesn't exist
                  if (!card.hasAttribute('data-id')) {
                        card.setAttribute('data-id', 'template-' + Math.random().toString(36).substr(2, 9));
                  }
                  
                  const selectBtn = card.querySelector('.select-btn');

                  if (selectBtn) {
                        const newBtn = selectBtn.cloneNode(true);
                        selectBtn.replaceWith(newBtn)
                        newBtn.addEventListener('click', (e)=> {
                              e.stopPropagation(); // Prevent card expansion if clicking the button
                              
                              const isSelected = card.classList.contains('selected');
                              const templateId = card.getAttribute('data-id');
                              const templateTitle = card.querySelector('.template-title')?.textContent || 'テンプレート';
                              const templateContents = card.querySelectorAll('.template-message')
                              const templateImages = card.querySelectorAll('.template-image')
                              const contentsArr= []

                              templateContents.forEach((content)=>{
                                    const data = {
                                          "content" : content.textContent,
                                          "order" : content.dataset.order,
                                          "type" : "text",
                                    }
                                    contentsArr.push(data)
      
                              })
                              templateImages.forEach((image)=>{
                                    const data = {
                                          "content" : image.src,
                                          "order" : image.dataset.order,
                                          "type" : "image",
                                          "cropArea" : image.dataset.cropArea ?? null
                                    }
                                    contentsArr.push(data)
      
                              })
      
                              if (isSelected) {
                                    const id = card.dataset.templateId
                                    const targetTemplate = Array.from(document.querySelectorAll(".chat-message-container")).find((container)=> container.dataset.templateId === id)
                                    this.messagesContainer.removeChild(targetTemplate)
                                    
                                    // Update UI
                                    card.classList.remove('selected');
                                    newBtn.classList.remove('selected');
                                    newBtn.textContent = '選択';

                                    this.index = this.index - Number(targetTemplate.dataset.count)

                                    console.log(this.index);
                                    
                              } else {

                                    this.selectedTemplates = {
                                          id: templateId,
                                          title: templateTitle,
                                          contents: contentsArr,
                                          template_id : card.dataset.templateId,
                                          count : templateContents.length + templateImages.length
                                    }
      
                                    // Update UI
                                    card.classList.add('selected');
                                    newBtn.classList.add('selected');
                                    newBtn.textContent = '選択済み';

                                    // Update the chat view
                                    this.updateSelectedTemplatesView();
                              }

                              this.#updateBtnTextAndState()

                              
                              
                        });
                  }
                  
            });
      }
      
}