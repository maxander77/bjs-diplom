// Intro
const logoutButton = new LogoutButton();

logoutButton.action = () => {
  ApiConnector.logout((response) => {
    if (response.success) {
      location.reload();
    } else {
      userForm.setLoginErrorMessage(response.error);
   }
  });
};


ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  } else {
    userForm.setLoginErrorMessage(response.error);
  }
});


// RatesBoard
const ratesBoard = new RatesBoard();

function requestPrice() {
  ApiConnector.getStocks((response) => {
    if (response.success === true) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response);
    } else {
      userForm.setRegisterErrorMessage(response.error);
    }
  });
};

requestPrice();
setInterval(requestPrice, 60000);


// MoneyManager
const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, "Баланс успешно пополнен");
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
};

  moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
      if (response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(true, "Конвертация выполнена успешно");
      } else {
        moneyManager.setMessage(false, response.error);
      }
     });
    };


  moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
      if (response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(true, "Перевод выполнен успешно");
      } else {
        moneyManager.setMessage(false, response.error);
      }
    });
  };


// FavoritesWidget
const favoritesWidget = new FavoritesWidget();

favoritesWidget.getFavorites = (data) => {
  ApiConnector.getFavorites((response) => {
    if (response.success) {
      favoritesWidget.fillTable(response.data);
      favoritesWidget.clearTable();
      favoritesWidget.updateUsersList();
    } else {
      favoritesWidget.setMessage(response.error);
    }
  });
};

favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
      favoritesWidget.setMessage(true, "Пользователь успешно добавлен в избранное");
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      favoritesWidget.updateUsersList();
    } else {
      favoritesWidget.setMessage(false, response.error);
    }
  });
};


favoritesWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    if(response.success) {
      favoritesWidget.setMessage(true, "Пользователь был удален из избранного");
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      favoritesWidget.updateUsersList();
    } else {
      favoritesWidget.setMessage(false, response.error);
    }
  });
};


// 