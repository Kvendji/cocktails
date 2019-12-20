document.addEventListener('DOMContentLoaded', function () {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
    )
        .then(response => response.json())
        .then(data => {
            let filter_wrapper = document.getElementById("wrapper_checkboxes");
            filter_wrapper.innerHTML = "";
            for (let element of data["drinks"]) {
                let item_name = element["strCategory"]
                let filter_item = document.createElement('div');
                filter_item.className = "wrapper_item_filter";

                let filter_input = document.createElement("input")
                filter_input.type = "checkbox";
                filter_input.name = item_name;
                filter_input.id = item_name;
                filter_input.checked = true;

                let filter_label = document.createElement("label");
                filter_label.htmlFor = item_name;
                filter_label.innerText = item_name;

                filter_item.appendChild(filter_input);
                filter_item.appendChild(filter_label);

                filter_wrapper.appendChild(filter_item);

            }
            load_cocktails();
        })
        .catch(error => console.error(error));


    function load_cocktails() {
        let form = document.getElementById("filter_form");
        let wrapper_content = document.getElementById("wrapper_content");
        wrapper_content.innerHTML = "";
        for (let element of form.elements) {
            if (element.checked) {
                let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${element.name}`;
                let category_title_element = document.createElement("h2");
                category_title_element.className = "main_title";
                category_title_element.innerText = element.name;
                wrapper_content.appendChild(category_title_element);
                let wrapper_coctails_list = document.createElement("div");
                wrapper_coctails_list.className ="row mx-0 wrapper_coctails_list";
                fetch(url,
                )
                    .then(response => response.json())        
                    .then(data => {
                            for (let drink of data["drinks"]) {
                                wrapper_coctails_list.innerHTML += `<div class="wrapper_item_coctails"> 
                                                                    <div class="wrapper_pic_coc\"> 
                                                                    <img src="${drink["strDrinkThumb"]}" alt="\" class="coc_pic img-fluid">
                                                                    </div>
                                                                    <h3 class="coc_name">${drink["strDrink"]}</h3>
                                                                </div>`
                            }
                        }
                    )
                    .catch(error => console.error(error));
                wrapper_content.appendChild(wrapper_coctails_list);
            }
        }
    }


    document.getElementById("filter_form").onsubmit = function (event) {
        event.preventDefault();
        load_cocktails();
    }
});
