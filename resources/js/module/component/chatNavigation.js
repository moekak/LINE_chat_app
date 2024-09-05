export const chatNavigator = () =>{
      const chat_btns = document.querySelectorAll(".js_chat_wrapper");

      chat_btns.forEach((btn) => {
          btn.addEventListener("click", (e) => {
              let id = e.currentTarget.getAttribute("data-id");
              let admin_id = e.currentTarget.getAttribute("data-admin-id");
              window.location.href = `/${admin_id}/${id}`;
          });
      });
}