# MagicMirror 설정 및 설치 가이드

이 저장소는 **MagicMirror²**를 처음 설치하고 커스텀 설정을 적용하기 위한 설정 파일과 가이드를 포함하고 있습니다.

## 1. 시스템 요구사항 및 OS 설치 (Raspberry Pi OS)

원활한 구동을 위해 다음 환경을 권장합니다.

*   **OS:** Raspberry Pi OS (A port of Debian Trixie with the Raspberry Pi Desktop)
*   **System:** 64-bit
*   **Release date:** 2025년 12월 4일 (또는 이후 최신 버전)

해당 OS가 설치되고 네트워크 연결 및 기본 설정이 완료된 상태에서 아래 설치를 진행해 주세요.

## 2. MagicMirror² 설치 (Raspberry Pi 권장)
터미널(Terminal)을 열고 아래 명령어를 입력하여 자동 설치 스크립트를 실행합니다.
```bash
bash -c  "$(curl -sL https://raw.githubusercontent.com/sdetweil/MagicMirror_scripts/master/raspberry.sh)"

스크린 세이버 off
bash -c "$(curl -sL https://raw.githubusercontent.com/sdetweil/MagicMirror_scripts/master/screensaveroff.sh)"
```

## 3. 한글 글꼴(폰트) 설치
MagicMirror 에서 한글이 깨지지 않고 예쁘게 출력되도록 나눔 폰트와 은 폰트를 설치합니다.
```bash
sudo apt install fonts-nanum fonts-nanum-extra
sudo apt install fonts-unfonts-core
```

## 4. MMPM (MagicMirror Package Manager) 설치
MagicMirror의 모듈들을 쉽게 브라우저에서 설치하고 관리할 수 있도록 해주는 패키지 매니저(MMPM)를 설치합니다.
```bash
# 가상 환경 생성 및 설치
python3 -m venv ~/MagicMirror/mmpm_venv
~/MagicMirror/mmpm_venv/bin/pip install --upgrade pip
~/MagicMirror/mmpm_venv/bin/pip install mmpm

# MMPM 설정 진행 (안내에 따라 진행)
~/MagicMirror/mmpm_venv/bin/mmpm guided-setup

# MMM-mmpm 모듈 및 UI 설치
~/MagicMirror/mmpm_venv/bin/mmpm install -y MMM-mmpm
~/MagicMirror/mmpm_venv/bin/mmpm ui install -y

# (선택) bash 자동완성 추가
~/MagicMirror/mmpm_venv/bin/mmpm completion --shell=bash
```

## 5. 해당 리포지토리 설정 파일 적용 방법

본 저장소에 포함된 `config.js` (기본 설정) 및 `custom.css` (사용자 정의 디자인 변경) 파일을 MagicMirror 설치 디렉토리로 이동/복사하여 적용해야 합니다.

1. **설정 파일(config.js) 복사:**
   이 저장소의 `MagicMirror/config/config.js` 파일을 실제 매직미러가 설치된 경로(예: `~/MagicMirror/config/`) 아래에 덮어씁니다. (본인의 환경에 맞게 상단 `ENV` 변수를 수정하세요)
2. **사용자 디자인 적용(custom.css) 복사:**
   이 저장소의 `MagicMirror/css/custom.css` 파일을 매직미러 설치 경로의 `css` 폴더에 덮어쓰기 합니다.

## 6. 필수 모듈 설치 방법

`config.js` 에 포함된 외부 모듈들을 설치해야 정상적으로 매직미러 화면이 출력됩니다.
MMPM을 이용하면 필요한 모듈을 찾아 쉽게 설치할 수 있습니다.

### 6-1. MMM-CalendarExt3 설치
```bash
~/MagicMirror/mmpm_venv/bin/mmpm install MMM-CalendarExt3
```

### 6-2. MMM-DailyAlarm 설치
```bash
~/MagicMirror/mmpm_venv/bin/mmpm install MMM-DailyAlarm
```

### 6-3. 커스텀 모듈 추가 및 설치
MMPM 기본 저장소에 없는 모듈의 경우, 커스텀 모듈로 추가 후 설치할 수 있습니다.

**MMM-Homeassistant 설치**
```bash
~/MagicMirror/mmpm_venv/bin/mmpm add-custom-module --title "MMM-Homeassistant" --author "eigger" --repo "https://github.com/eigger/MMM-Homeassistant" --desc "Homeassistant module"
~/MagicMirror/mmpm_venv/bin/mmpm install MMM-Homeassistant
```

**MMM-Webhook-Notification 설치**
```bash
~/MagicMirror/mmpm_venv/bin/mmpm add-custom-module --title "MMM-Webhook-Notification" --author "eigger" --repo "https://github.com/eigger/MMM-Webhook-Notification" --desc "Webhook Notification module"
~/MagicMirror/mmpm_venv/bin/mmpm install MMM-Webhook-Notification
```

## 7. Webhook 설치 및 설정
MagicMirror에 외부에서 알림 등을 보내기 위해 `webhook` 패키지를 설치합니다.

```bash
sudo apt install webhook
```

설치가 완료되면, 이 저장소의 `Webhook` 폴더(혹은 `hooks.json` 등 설정 파일이 있는 폴더)를 라즈베리파이의 적당한 경로(예: `~/Webhook`)로 복사하여 사용합니다.

```bash
# Webhook 폴더 복사 예시
cp -r /이/저장소/경로/Webhook ~/Webhook

chmod a+x turn_on_screen.sh
chmod a+x turn_on_screen.sh
# Webhook 서버 실행 예시 (필요시 systemd 서비스로 등록하여 백그라운드 실행 권장)
/home/pi/.bashrc 하단부 추가
webhook -port 9090 -hooks /home/pi/Webhook/hooks.json
```

## 8. Home Assistant 연동 설정 (REST Command)
Home Assistant의 `configuration.yaml` 에 아래 내용을 추가하여 MagicMirror 화면 제어(켜기/끄기) 및 재시작, 알림 메시지 전송을 구성할 수 있습니다. 
*(ip 주소 `<MagicMirror_IP>` 부분은 실제 MagicMirror가 설치된 기기의 IP로 변경하세요.)*

```yaml
rest_command:
  turn_on_magic_mirror:
    url: http://<MagicMirror_IP>:9090/hooks/turn_on_screen
    method: POST
  turn_off_magic_mirror:
    url: http://<MagicMirror_IP>:9090/hooks/turn_off_screen
    method: POST
  restart_magic_mirror:
    url: http://<MagicMirror_IP>:7891/api/mm-ctl/restart
    method: GET
  notify_magic_mirror:
    url: http://<MagicMirror_IP>:8080/webhook?"
    payload: '{"message":"{{ message }}", "status":"{{ status }}", "timeout":"{{ timeout }}", "position":"{{ position }}", "width":"{{ width }}", "icon":"{{ icon }}", "size":"{{ size }}", "effect":"{{ effect }}"}'
    content_type: "application/json"
    method: POST
```

### 9. Home Assistant 자동화(Automation) 연동 예제

설정한 `rest_command`를 활용하여 Home Assistant 자동화에서 MagicMirror로 알림을 띄우는 예제입니다.

**예제 1: 단순 텍스트 알림 전송 (휴식 권고)**
```yaml
action: rest_command.notify_magic_mirror
data:
  message: 충분한 휴식을 취해 주시기 바랍니다.
  status: success
  timeout: 600000
  position: tc
  width: 450px
  icon: coffee
  speed: 50
  size: 20px
  effect: slide
```

**예제 2: 센서 값(온도) 연동 알림 전송**
```yaml
action: rest_command.notify_magic_mirror
data:
  message: "온도: {{ states('sensor.office_thermometer_temperature') }}°C"
  status: info
  timeout: 10000
  position: tr
  width: 260px
  icon: thermometer
  speed: 500
  size: 16px
  effect: ""
```

## 8. Samba (파일 공유 서버) 설치 방법

MagicMirror가 설치된 라즈베리파이에 파일과 폴더를 쉽게 복사, 수정할 수 있도록 Samba(삼바)를 설치하고 설정하는 방법입니다. 윈도우(Windows)나 맥(Mac)에서 폴더 탐색기처럼 라즈베리파이 내부 폴더에 접속할 수 있습니다.

**1. 패키지 설치**
```bash
sudo apt install samba samba-common-bin vim -y
```

**2. 삼바 설정 파일 수정**
```bash
sudo vim /etc/samba/smb.conf
```

편집기(Vim)가 열리면 알파벳 `i` 글쇠를 한 번 눌러 **입력 모드(Insert)**로 변경한 다음, 파일 맨 아래에 다음 내용을 추가합니다.

```ini
[pi]
  path = /home/pi
  writeable = yes
  create mask = 0777
  directory mask = 0777
  public = no
```
*작성이 끝났으면 `Esc` 키를 누르고 👉 `:` 콜론을 누른 후 👉 `wq` 를 입력하고 👉 `Enter` 키를 눌러 저장 후 편집기를 종료합니다.*

**3. 삼바 접속용 비밀번호 설정 및 서비스 재시작**

아래 명령어를 입력하여 네트워크 상에서 Pi(라즈베리파이) 폴더 접근 시 사용할 비밀번호를 등록합니다. (예: 시스템 암호와 동일하게 설정)
```bash
sudo smbpasswd -a pi
sudo systemctl restart smbd
```
설정이 모두 완료되었습니다. 이제 PC에서 `\\<라즈베리파이IP>\pi` 경로로 접근하여 계정명 `pi` 와 방금 설정한 비밀번호를 입력하면 라즈베리파이 내부의 폴더를 자유롭게 이용할 수 있습니다.
