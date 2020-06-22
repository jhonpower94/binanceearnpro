useEffect(() => {
    const body = {
      version: 1,
      cmd: "create_transaction",
      key: "1f6d19f8eaf333cbd4812f313f6c489dd7d8a86480c7726e4f167952c445b20c",
      format: "json",
      amount: 0.50,
      currency1: "USD",
      currency2: "LTCT",
      buyer_email: "jhonsnow751@gmail.com",
    };
    ajax({
      url: "http://localhost/testing/index.php",
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body,
    }).subscribe((data) => {
      console.log(data.response.name);
      ajax({
        url: "https://www.coinpayments.net/api.php",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          HMAC: data.response.name,
        },
        body: body,
      }).subscribe((datas) => {
        console.log(datas.response.result);
        const txid = datas.response.result.txn_id;
        ajax({
          url: "http://localhost/testing/index.php",
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: {
            version: 1,
            cmd: "get_tx_info",
            key:
              "1f6d19f8eaf333cbd4812f313f6c489dd7d8a86480c7726e4f167952c445b20c",
            format: "json",
            txid: txid,
            full: 1,
          },
        }).subscribe((data) => {
          ajax({
            url: "https://www.coinpayments.net/api.php",
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              HMAC: data.response.name,
            },
            body: {
              version: 1,
              cmd: "get_tx_info",
              key:
                "1f6d19f8eaf333cbd4812f313f6c489dd7d8a86480c7726e4f167952c445b20c",
              format: "json",
              txid: txid,
              full: 1,
            },
          }).subscribe((datat) => {
            console.log(datat);
            setRecieved(datat.response.result.received);
            setRecievedf(datat.response.result.receivedf);
            setStatus(datat.response.result.status_text);
          });
        });
      });
    });
  }, []);

  fetch(
    `http://localhost/phpmailer/newfile.php?from=support@doqirworld.com&to=uchennanwokedi230@gmail.com&subject=testing_email&html=<p>hello world</p>&text=`,
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then((data) => console.log(data));

    fetch(
      `https://doqirworld.com/phpmailer/newfile.php?host=${host}&port=${smtpport}&security=${secure}&username=${username}&password=${password}&from=${from}&fromname=${fromname}&to=${email}&subject=${subject}&message=${message}&name=${name}&domain=${domain}&attachment=${attachment}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        if (data.message == "failed") {
          dispatch(failed$());
        } else {
          dispatch(sent$());
        }
      });

      ajax({
        url: "http://localhost/phpmailer/testing.php",
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "yyyy",
          to: "zzzzz",
        }),
      }).subscribe((data) => console.log(data));

  