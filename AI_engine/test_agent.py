"""
Test script for TechPath AI Engine
Tests the complete flow: agent.py -> app.py -> API endpoint
Run the FastAPI server first with: python app.py
Then run this in another terminal: python test_agent.py
"""

import requests
import json
import time

BASE_URL = "http://localhost:5000"

def test_endpoint(subject):
    """Test the /api/generate-path endpoint"""
    try:
        print(f"\n{'='*70}")
        print(f"Testing with subject: {subject}")
        print('='*70)
        
        start_time = time.time()
        
        response = requests.post(
            f"{BASE_URL}/api/generate-path",
            json={"subject": subject},
            headers={"Content-Type": "application/json"}
        )
        
        elapsed_time = time.time() - start_time
        
        print(f"Status Code: {response.status_code}")
        print(f"Response Time: {elapsed_time:.2f}s")
        
        if response.status_code == 200:
            result = response.json()
            print("\n✓ SUCCESS\n")
            print(json.dumps(result, indent=2))
            
            # Validate structure
            if result.get('success') and result.get('data'):
                data = result['data']
                print(f"\n✓ Structure valid:")
                print(f"  - Title: {data.get('title', 'MISSING')}")
                print(f"  - Roles: {len(data.get('roles', []))} items")
                print(f"  - Skills: {len(data.get('skills', []))} items")
                print(f"  - Description: {len(data.get('description', ''))} chars")
                print(f"  - Why: {len(data.get('why', ''))} chars")
                return True
            else:
                print("\n✗ Invalid structure")
                return False
        else:
            print(f"\n✗ FAILED")
            print(f"Response: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("\n✗ Cannot connect to server")
        print("Make sure the FastAPI server is running: python app.py")
        return False
    except Exception as e:
        print(f"\n✗ Error: {e}")
        return False

def test_health():
    """Test the health endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/health")
        if response.status_code == 200:
            print("✓ Health check passed")
            return True
        else:
            print(f"✗ Health check failed: {response.status_code}")
            return False
    except:
        print("✗ Server not reachable")
        return False

def main():
    print("="*70)
    print("  TECHPATH AI ENGINE - API TEST")
    print("="*70)
    
    # Check health first
    print("\nChecking server health...")
    if not test_health():
        print("\n⚠️  Server is not running!")
        print("Start it with: python app.py")
        return
    
    # Test subjects
    test_subjects = [
        "Marine Biology",
        "Psychology", 
        "Mechanical Engineering"
    ]
    
    print(f"\n\nRunning {len(test_subjects)} test cases...")
    
    results = []
    for subject in test_subjects:
        success = test_endpoint(subject)
        results.append(success)
    
    # Summary
    print("\n" + "="*70)
    print("  TEST SUMMARY")
    print("="*70)
    passed = sum(results)
    total = len(results)
    print(f"Passed: {passed}/{total}")
    
    if passed == total:
        print("\n✓ ALL TESTS PASSED!")
        print("The complete flow (agent.py -> app.py -> API) is working!")
    else:
        print("\n✗ SOME TESTS FAILED")
        print("Check the errors above")
    
    print("="*70)

if __name__ == "__main__":
    main()
