"""
Quick test to verify the FastAPI app is working
Run this AFTER starting the server with: python app.py
"""

import requests
import json

BASE_URL = "http://localhost:5000"

def test_health():
    print("Testing health endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        if response.status_code == 200:
            print("✓ Health check passed!")
            print(f"  Response: {response.json()}")
            return True
        else:
            print(f"✗ Health check failed with status {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("✗ Cannot connect to server. Make sure it's running on port 5000")
        return False

def test_generate_path():
    print("\nTesting generate-path endpoint...")
    try:
        payload = {"subject": "Psychology"}
        response = requests.post(
            f"{BASE_URL}/api/generate-path",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            result = response.json()
            if result.get('success'):
                print("✓ Path generation successful!")
                print(f"  Subject: {result['subject']}")
                print(f"  Title: {result['data']['title']}")
                print(f"  Roles: {len(result['data']['roles'])} roles generated")
                print(f"  Skills: {len(result['data']['skills'])} skills listed")
                return True
            else:
                print(f"✗ Path generation failed: {result.get('error')}")
                return False
        else:
            print(f"✗ Request failed with status {response.status_code}")
            print(f"  Response: {response.text}")
            return False
    except Exception as e:
        print(f"✗ Error: {e}")
        return False

def main():
    print("=" * 60)
    print("  TECHPATH FASTAPI SERVER TEST")
    print("=" * 60)
    print()
    
    # Test health endpoint
    health_ok = test_health()
    
    if not health_ok:
        print("\n⚠️  Server is not running or not accessible")
        print("Start the server with: python app.py")
        return
    
    # Test generate-path endpoint
    path_ok = test_generate_path()
    
    print("\n" + "=" * 60)
    if health_ok and path_ok:
        print("  ✓ ALL TESTS PASSED!")
        print("  The API is ready for frontend integration")
    else:
        print("  ✗ SOME TESTS FAILED")
        print("  Check the server logs for details")
    print("=" * 60)

if __name__ == "__main__":
    main()
