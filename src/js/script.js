const url = "https://jsonplaceholder.typicode.com/posts";

    // Функция для отправки AJAX-запроса
     const sendFormData = async (formData) => {
        try {
            const response = await fetch(url, {
                method: "POST",
                body: formData
            });

            // Проверка статуса ответа
            if (response.ok) {
                // Возвращаем текст ответа
                return await response.text();
            } else {
                // Генерируем ошибку если HTTP-статус не 200
                throw new Error("Ошибка при отправке данных");
            }
        } catch (error) {
            // Обрабатываем ошибку fetch, недоступность сервера или сетевая ошибка
            console.error("Произошла ошибка:", error.message);
            throw error; 
        }
    }

// Получение элементов формы
const form = document.querySelector(".subscribe__form");
const emailInput = form.querySelector(".subscribe__input");
const subscribeTitle = document.querySelector(".subscribe__title");

// Обработчик события отправки формы
form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы

    // Получаем значение поля email из формы
    const emailValue = emailInput.value;

    // Проверяем, заполнено ли поле email и в нужном формате
    if (!emailValue || !validateEmail(emailValue)) {        
        alert('Пожалуйста, введите ваш адрес электронной почты.');
        return; 
    }

    // Создаем объект FormData и добавляем в него данные формы
    const formData = new FormData();
    formData.append("email", emailValue);

    try {
        // Отправляем данные формы на сервер
        const responseText = await sendFormData(formData);

        // Выводим сообщение об успешной отправке
        console.log("Успешно", responseText);

        // Заменяем форму сообщением об успешной подписке
        form.innerHTML = `<div class="subscribe__alert_success">Отправлено!</div>`;
        // Скрываем заголовок
        subscribeTitle.style.display = 'none';
    } catch (error) {
        // Обрабатываем ошибку
        console.error("Ошибка:", error.message);  

        alert('Произошла ошибка при отправке данных. Пожалуйста, попробуйте еще раз.');
    }

});

// Функция для проверки корректности введенного email
const validateEmail = (email) => {
    // Регулярное выражение для проверки формата email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}